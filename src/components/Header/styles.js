import { StyleSheet, StatusBar, Platform } from 'react-native'

const ios = Platform.OS === 'ios'
const statusBarHeight = ios ? 20 : StatusBar.currentHeight

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F8',
  },
  header: {
    alignItems: 'center',
    paddingTop: statusBarHeight,
    minHeight: 44,
    backgroundColor: '#61C2C7'
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

export default styles
