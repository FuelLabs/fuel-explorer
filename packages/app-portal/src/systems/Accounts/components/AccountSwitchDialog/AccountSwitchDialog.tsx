import { cssObj } from "@fuel-ui/css";
import {
  Avatar,
  Box,
  Button,
  Copyable,
  Dialog,
  Icon,
  IconButton,
  List,
  Text,
} from "@fuel-ui/react";
import { shortAddress } from "~/systems/Core/utils";

type AccountSwitchDialogProps = {
  accounts: string[];
  onSelect?: (val: string) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onClose?: () => void;
};

export const AccountSwitchDialog = ({
  accounts,
  onSelect,
  onConnect,
  onDisconnect,
  onClose,
}: AccountSwitchDialogProps) => {
  return (
    <>
      <Dialog.Heading>
        Ethereum Accounts
        <IconButton
          data-action="closed"
          variant="link"
          icon={<Icon icon="X" color="gray8" />}
          aria-label="Close unlock window"
          onClick={onClose}
        />
      </Dialog.Heading>
      <Dialog.Description css={styles.description}>
        <List>
          {accounts.map((account) => {
            return (
              <List.Item
                key={account}
                css={
                  onSelect
                    ? { ...styles.listItem, ...styles.select }
                    : styles.listItem
                }
                onClick={() => onSelect?.(account)}
              >
                <Box.Flex align="center" gap="$3">
                  <Avatar.Generated size={"xsm"} hash={account} />
                  <Text color="gray12">{shortAddress(account)}</Text>
                  <Copyable value={account} />
                </Box.Flex>
              </List.Item>
            );
          })}
        </List>
      </Dialog.Description>
      <Dialog.Footer css={styles.footer}>
        <Box.Stack css={styles.stack}>
          {onConnect && (
            <Button css={styles.button} onClick={onConnect}>
              Connect Account
            </Button>
          )}
          {onDisconnect && (
            <Button css={styles.button} onClick={onDisconnect}>
              Disconnect Wallet
            </Button>
          )}
        </Box.Stack>
      </Dialog.Footer>
    </>
  );
};

const styles = {
  stack: cssObj({
    width: "100%",
  }),
  listItem: cssObj({
    pl: "$1",
    pt: "$1",
    pb: "$1",
  }),
  description: cssObj({
    px: "$8",
    pt: "$8",
  }),
  button: cssObj({
    borderRadius: "$md",
    backgroundColor: "$gray6",
    color: "$gray12",
  }),
  select: cssObj({
    "&:hover": { backgroundColor: "$gray1" },
    cursor: "pointer",
    borderRadius: "$md",
  }),
  footer: cssObj({
    px: "$8",
    pb: "$8",
    justifyContent: "center",
  }),
};
