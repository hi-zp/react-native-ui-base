# React Native UI Base

Welcome to the React Native UI Base, a collection of essential UI components designed to accelerate the development of high-quality mobile applications using React Native.

## Installation

```sh
npm install react-native-ui-base
```

## Usage


```tsx
import { ThemeProvider } from 'react-native-ui-base';

return (
  <ThemeProvider>
    {children}
  </ThemeProvider>
)

import { SafeAreaView } from "react-native";
import { Typography, View, Text } from "react-native-ui-base";

Typography.loadTypographies({
  test: { fontSize: 12, color: 'red' },
});

return (
  <SafeAreaView>
    <View bg-$backgroundDefault gap-10 br0 margin-s1>
      <Text h1>Title/H1</Text>
    </View>
  </SafeAreaView>
)
```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
