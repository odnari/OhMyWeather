import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f9f9fa',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dfdfdf'
  },
  text: {
    fontSize: 16
  },
  label: {
    flexGrow: 1,
    opacity: 0.9
  },
  unit: {
    marginLeft: 4
  }
})

export default styles
