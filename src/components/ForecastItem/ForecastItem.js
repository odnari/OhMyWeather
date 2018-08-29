import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import styles from './styles'

const ForecastItem = ({ label, value, unit }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.label]}>{label}</Text>
      <Text style={[styles.text, styles.value]}>{value}</Text>
      {
        unit &&
        <Text style={[styles.text, styles.unit]}>{unit}</Text>
      }
    </View>
  )
}

ForecastItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  unit: PropTypes.string
}

export default ForecastItem
