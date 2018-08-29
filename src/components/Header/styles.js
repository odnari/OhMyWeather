import { StyleSheet, StatusBar, Platform } from 'react-native'

const ios = Platform.OS === 'ios'
const statusBarHeight = ios ? 20 : StatusBar.currentHeight

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: statusBarHeight,
    minHeight: 44,
    backgroundColor: '#61C2C7'
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    margin: 10,
    color: '#fff'
  },
})

export default styles
