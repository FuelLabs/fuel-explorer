import { cssObj } from '@fuel-ui/css';
import {
  Box,
  Button,
  Dialog,
  Input,
  Text,
  Form,
  IconButton,
} from '@fuel-ui/react';
import { Controller } from 'react-hook-form';
import { store } from '~/store';
import { shortAddress } from '~/systems/Core';
import { useOverlay } from '~/systems/Overlay';

import { useAddAssetForm, useAssets } from '../hooks';
import type { AddAssetFormValues } from '../hooks';

export function AddAssetFormDialog() {
  const { metadata } = useOverlay<{ assetAddress: string }>();
  const { handlers, isLoading } = useAssets();

  const form = useAddAssetForm();
  const { control } = form;

  const onSubmit = (data: AddAssetFormValues) => {
    handlers.addAsset({
      asset: {
        address: metadata.assetAddress,
        image: '',
        decimals: Number(data.decimals),
        symbol: data.symbol.toUpperCase(),
      },
    });
    store.openEthAssetsDialog();
  };

  return (
    <>
      <Dialog.Close />
      <Dialog.Heading>
        <Box.Flex gap="$4" justify="start">
          <IconButton
            aria-label="Open eth assets dialog"
            variant="link"
            icon="ArrowLeft"
            onPress={store.openEthAssetsDialog}
          />
          <Text color="intentsBase12" fontSize="sm">
            Add token {shortAddress(metadata.assetAddress)}
          </Text>
        </Box.Flex>
      </Dialog.Heading>
      <Dialog.Description>
        <Box.Stack
          as="form"
          id="AddAssetForm"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Controller
            name="symbol"
            control={control}
            render={(props) => {
              const isInvalid =
                Boolean(form.formState.errors.symbol) ||
                Boolean(props.fieldState.error);
              return (
                <Form.Control isRequired isInvalid={isInvalid}>
                  <Form.Label css={styles.fieldLabel}>Token symbol</Form.Label>
                  <Input size="md" css={styles.fieldLabel}>
                    <Input.Field {...props.field} placeholder="SYMBOL" />
                  </Input>
                  {props.fieldState.error && (
                    <Form.ErrorMessage aria-label="Error message">
                      {props.fieldState.error.message}
                    </Form.ErrorMessage>
                  )}
                </Form.Control>
              );
            }}
          />

          <Controller
            name="decimals"
            control={control}
            render={(props) => {
              const isInvalid =
                Boolean(form.formState.errors.decimals) ||
                Boolean(props.fieldState.error);
              return (
                <Form.Control isRequired isInvalid={isInvalid}>
                  <Form.Label css={styles.fieldLabel}>
                    Token decimals
                  </Form.Label>
                  <Input size="md" css={styles.fieldLabel}>
                    <Input.Number {...props.field} placeholder="18" />
                  </Input>
                  {props.fieldState.error && (
                    <Form.ErrorMessage aria-label="Error message">
                      {props.fieldState.error.message}
                    </Form.ErrorMessage>
                  )}
                </Form.Control>
              );
            }}
          />
        </Box.Stack>
      </Dialog.Description>
      <Dialog.Footer>
        <Button
          type="submit"
          size="sm"
          intent="primary"
          isDisabled={!form.formState.isValid}
          isLoading={isLoading}
          form="AddAssetForm"
          css={styles.addTokenButton}
        >
          Add token to list
        </Button>
      </Dialog.Footer>
    </>
  );
}

const styles = {
  fieldLabel: cssObj({
    fontSize: '$sm',
  }),
  addTokenButton: cssObj({
    width: '$full',
  }),
};
