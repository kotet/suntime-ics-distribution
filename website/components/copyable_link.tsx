import { CopyButton, Text, Button, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React from 'react';
import { useTranslation } from 'react-i18next';

export type CopyableLinkProps = {
  href: URL;
  children?: React.ReactNode;
};

export const CopyableLink: React.FC<CopyableLinkProps> = ({ href, children }) => {
  const { t } = useTranslation();
  const onClick: (copy: () => void) => () => void = (copy) => {
    return() => {
  copy();
  notifications.show({
    title: t('copied'),
    message: t('copied_message', { url: href.toString() }),
  })
};
  }
return <Group justify='space-between'>
  <Text component='a' href={href.toString()}>{children ? children : href.toString()}</Text>
  <CopyButton value={href.toString()} >
    {(
      ({ copy, copied }) => <Button color={copied?'green.9': undefined} onClick={onClick(copy)}>{copied?t('done'):t('copy')}</Button>
    )}
  </CopyButton>
</Group>;
};
