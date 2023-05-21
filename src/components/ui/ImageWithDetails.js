import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';

const ImageWithDetails = ({ label,imageSource, title, subtitle1, subtitle2,iconSource,onUploadPress,onUpdatePress,onDeletePress }) => {
  return (
    <View style={{marginTop: 10,}}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.container}>
            <Image source={imageSource} style={styles.image} />
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle1} onPress={onUpdatePress}>{subtitle1} </Text>
                <Text style={styles.subtitle2} onPress={onDeletePress}>{subtitle2}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={onUploadPress}>
              <Image source={iconSource} style={styles.image} />
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent:'space-between',

  },  
  label: {
    fontSize:17,
    fontWeight:'500',
    color:'#212B36',
    marginLeft:5,
    paddingBottom:10
  },
  image: {
    width: 60,
    height: 60,
    borderRadius:30
  },
  detailsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    // marginVer: 16,
  },
  title: {
    color:'#000',
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 8,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  subtitle1: {
    marginRight: 8,
    fontSize: 16,
    fontWeight:'600',
    color:'#637381',
    paddingRight:20
  },
  subtitle2: {
    marginRight: 8,
    fontSize: 16,
    fontWeight:'600',
    color:'#3056D3'
  },
});

export default ImageWithDetails;
