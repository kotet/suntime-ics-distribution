import { Text } from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";

export const Disclaimer: React.FC = () => {
  const {t} = useTranslation();
  return <Text>
    {t('disclaimer')}
    </Text>;
};
