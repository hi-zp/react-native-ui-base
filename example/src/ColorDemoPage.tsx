import { Text } from "react-native";
import { Colors, useTheme, View, } from "react-native-ui-base";

Colors.loadColors({
  yellow50: 'green',
});

export const ColorDemoPage = () => {
  const { colorScheme } = useTheme();

  return (
    <View gap-10 flex-1>
      <Text>Color Scheme: {colorScheme}</Text>
      <View style={{ backgroundColor: Colors.yellow50 }} bg-green50>
        <Text>Custom Colors.yellow50 / bg-green50</Text>
      </View>
      <View bg-yellow50 bg-green50 bg-red50>
        <Text>bg-yellow50 / bg-green50 / bg-red50</Text>
      </View>

      <View bg-yellow10 br2 padding-50>
        <Text>bg-yellow10 / br2</Text>
      </View>

      <View style={{ height: 100 }} bg-grey50 right centerV>
        <Text>right centerV</Text>
        <View bg-dark style={{ width: 30, height: 30 }}></View>
      </View>

      <View bg-grey50 left centerH row style={{ height: 50 }}>
        <View bg-red10 flex-1>
          <Text>flex-1</Text>
        </View>
        <View bg-yellow10>
          <Text>right</Text>
        </View>
      </View>

      <View bg-grey50 left centerH row style={{ height: 50 }}>
        <View absR absB style={{ width: 100, height: 30 }} bg-yellow10>
          <Text>absR absB</Text>
        </View>
      </View>
    </View>
  );
}