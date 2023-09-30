import { CopyButton, Text, Button, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React from 'react';

export type CopyableLinkProps = {
  href: URL;
  children?: React.ReactNode;
};

export const CopyableLink: React.FC<CopyableLinkProps> = ({ href, children }) => {
  const onClick: (copy: () => void) => () => void = (copy) => {
    return() => {
  copy();
  notifications.show({
    title: 'コピーしました',
    message: 'URL: ' + href.toString() + ' をコピーしました',
  })
};
  }
return <Group position='apart'>
  <Text component='a' href={href.toString()}>{children ? children : href.toString()}</Text>
  <CopyButton value={href.toString()} >
    {(
      ({ copy, copied }) => <Button color={copied?'green.9': undefined} onClick={onClick(copy)}>{copied?"完了！":"コピー"}</Button>
    )}
  </CopyButton>
</Group>;
};
