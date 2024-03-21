import { Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Colors from 'src/components/Colors'
import { Text, View } from 'src/components/Themed'
import { type RootStackScreenProps } from 'src/navigation/types'

export default ({
  navigation,
  route
}: RootStackScreenProps<'GameMode'>): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline}>Would you rather <Text style={styles.red}>game</Text></Text>
      <Text style={styles.title}>Select game mode</Text>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => navigation.navigate('Game', { level: 1 })}>
          <View style={styles.button} lightColor={Colors.dark.background} darkColor={Colors.light.background}>
            <Text lightColor={Colors.dark.text} darkColor={Colors.light.text} style={styles.buttonText}>Normal</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Game', { level: 2 })}>
          <View style={styles.button} lightColor={Colors.dark.background} darkColor={Colors.light.background}>
            <Text lightColor={Colors.dark.text} darkColor={Colors.light.text} style={styles.buttonText}>Absurd</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Game', { level: 3 })}>
          <View style={styles.button} lightColor={Colors.dark.background} darkColor={Colors.light.background}>
            <Text lightColor={Colors.dark.text} darkColor={Colors.light.text} style={styles.buttonText}>Omega Absurd</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headline: {
    fontSize: 32
  },
  title: {
    marginTop: 20,
    fontSize: 24
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginVertical: 10,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  red: {
    color: 'red'
  },
  buttonText: {
    fontSize: 20
  }
})
