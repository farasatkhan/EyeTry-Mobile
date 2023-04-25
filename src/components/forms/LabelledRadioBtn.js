import * as React from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

const LabelledRadioBtn = ({ label, value, checked, setChecked,style }) => {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' },style]}>
      <RadioButton
        value={value}
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => setChecked(value)}
      />
      <Text style={{fontSize:16,color:"#000"}}>{label}</Text>
    </View>
  );
};

export default LabelledRadioBtn;
