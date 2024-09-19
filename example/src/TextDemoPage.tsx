import { SafeAreaView } from "react-native";
import { Typography, View, Text } from "react-native-ui-base";

Typography.loadTypographies({
  test: { fontSize: 12, color: 'red' },
});

export const TextDemoPage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View bg-$backgroundDefault gap-10 br0 margin-s1>
        <Text h1>Title/H1</Text>
        <Text h2>Title/H2</Text>
        <Text h3>Title/H3</Text>
        <Text h4>Title/H4</Text>
        <Text h5>Title/H5</Text>
        <Text h6>Title/H6</Text>
        <Text regular>Text/Regular</Text>
        <Text small>Text/Small</Text>
        <Text tiny>Text/Tiny-Caption</Text>
        <Text test>Text/test cu</Text>
      </View>
    </SafeAreaView>
  );
}