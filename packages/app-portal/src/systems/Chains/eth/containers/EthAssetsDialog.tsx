import { cssObj } from '@fuel-ui/css';
import {
  Box,
  CardList,
  Dialog,
  Icon,
  Text,
  Button,
  Form,
  Input,
  IconButton,
  Spinner,
} from '@fuel-ui/react';
import { useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { store } from '~/store';
import { useBridge } from '~/systems/Bridge/hooks';
import { shortAddress } from '~/systems/Core';

import { EthAssetCard } from '../components';
import { useManageEthAssets, useSetAddressForm } from '../hooks';
import type { SetAddressFormValues } from '../hooks';

export function EthAssetsDialog() {
  const { handlers: bridgeHandlers } = useBridge();
  const [editable, setEditable] = useState(false);

  const form = useSetAddressForm();

  const assetQuery = useWatch({ name: 'address', control: form.control });

  const {
    assets,
    handlers,
    showCustomTokenButton,
    showUseTokenButton,
    assetInfo,
    isLoading,
    doesAssetExist,
  } = useManageEthAssets({ assetQuery });

  const onSubmitToken = () => {
    handlers.addAsset({
      asset: {
        address: assetInfo?.address,
        decimals: assetInfo?.decimals,
        symbol: assetInfo?.symbol,
      },
    });
    form.resetField('address');
  };

  const onSubmitCustomToken = (data: SetAddressFormValues) => {
    store.openAddAssetsDialog({
      assetAddress: data.address,
    });
  };

  return (
    <>
      <Dialog.Close />
      <Dialog.Heading>
        <Box.Flex gap="$4" justify="start">
          {editable && (
            <IconButton
              aria-label="Set editable to false"
              variant="link"
              icon="ArrowLeft"
              onPress={() => setEditable(false)}
            />
          )}
          <Text color="intentsBase12" fontSize="sm">
            {!editable ? 'Select token' : 'Manage token list'}
          </Text>
        </Box.Flex>
      </Dialog.Heading>
      <Dialog.Description css={styles.dialogDescription}>
        <Box.Flex align="center" css={styles.controllerWrapper}>
          <Controller
            name="address"
            control={form.control}
            render={(props) => {
              return (
                <Form.Control css={{ width: '$full' }}>
                  <Input size="md" css={styles.headerInput}>
                    <Input.Field
                      {...props.field}
                      placeholder="Search or paste custom address"
                    />
                    {isLoading && (
                      <Input.ElementRight>
                        <Spinner />
                      </Input.ElementRight>
                    )}
                  </Input>
                  {!doesAssetExist &&
                    !(showCustomTokenButton || showUseTokenButton) &&
                    !isLoading && (
                      <Form.HelperText>{`No asset found for your search "${assetQuery}"`}</Form.HelperText>
                    )}
                </Form.Control>
              );
            }}
          />
        </Box.Flex>
        <CardList isClickable={!editable}>
          <>
            {showUseTokenButton && (
              <EthAssetCard
                name={assetInfo?.symbol || ''}
                hash={assetInfo?.address}
                onAdd={form.handleSubmit(onSubmitToken)}
              />
            )}
          </>
          <>
            {showCustomTokenButton && (
              <EthAssetCard
                name={shortAddress(form.getValues('address'))}
                hash={assetQuery}
                onAdd={form.handleSubmit(onSubmitCustomToken)}
              />
            )}
          </>
          <>
            {doesAssetExist &&
              !(showCustomTokenButton || showUseTokenButton) &&
              assets.map((asset, i) => (
                <EthAssetCard
                  key={`${asset.address || ''}${asset.symbol || ''}${String(
                    i
                  )}`}
                  imageSrc={asset.image}
                  hash={asset.address}
                  name={asset.symbol || ''}
                  isRemoveDisabled={asset.address === undefined}
                  removeToolTip={
                    asset.address === undefined
                      ? 'ETH is a native asset.  It can not be removed'
                      : undefined
                  }
                  onPress={
                    !editable
                      ? () => {
                          bridgeHandlers.changeAssetAddress({
                            assetAddress: asset.address,
                          });
                        }
                      : undefined
                  }
                  onRemove={
                    editable
                      ? () => {
                          handlers.removeAsset({ address: asset.address });
                        }
                      : undefined
                  }
                />
              ))}
          </>
        </CardList>
      </Dialog.Description>
      {!editable && (
        <Dialog.Footer css={styles.dialogFooter}>
          <Button variant="link" onPress={() => setEditable(true)}>
            <Icon icon="Edit" />
            <Text color="intentsBase10">Manage token list</Text>
          </Button>
        </Dialog.Footer>
      )}
    </>
  );
}

const styles = {
  actionButton: cssObj({
    width: '100%',
  }),
  dialogDescription: cssObj({
    pb: '$5',
  }),
  controllerWrapper: cssObj({
    pb: '$5',
  }),
  dialogFooter: cssObj({
    borderTop: '1px solid $border',
    justifyContent: 'center',
    paddingTop: '$2',
  }),
  headerInput: cssObj({
    fontSize: '$sm',
  }),
};
