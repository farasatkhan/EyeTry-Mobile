import * as React from 'react';
import {
    ScrollView, Image, View, Text, StyleSheet, Alert, TouchableOpacity,
} from 'react-native';


import { captureImage } from '../../utils/Camera/imageCapture';
import { chooseFile } from '../../utils/Camera/imageCapture';

// importing form components
import Container from '../../components/ui/Container';
import PrimaryButton from '../../components/ui/PrimaryButton';
import MediumButtonOutlineIcon from '../../components/ui/MediumButtonOutlineIcon';
import HorizontalDivider from '../../components/ui/HorizontalDivider';

import { sendImageToIPDServer } from '../../services/Profile/userapi';
import { getArucoMarkerPdf } from '../../services/Profile/userapi';

import PrimaryButtonOutline from '../../components/ui/PrimaryButtonOutline';

const CheckIPD = ({ navigation }) => {


    const [guidlineShown, SetGuidelinesShow] = React.useState(false)

    const [filePath, setFilePath] = React.useState({})
    const [localImage, setLocalImage] = React.useState(false)


    const [successVisible, setSuccessVisible] = React.useState(false)
    const [successMessage, setSuccessMessage] = React.useState(null)

    const [errorVisible, setErrorVisible] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState(null)

    // Clear the error and success msgs on every rerender
    React.useEffect(() => {
        setErrorVisible(false)
        setSuccessVisible(false)
        SetGuidelinesShow(false)
    }, [])

    const handleImageCapture = async () => {
        try {
            const response = await captureImage('photo')
            console.log("capture res", response)
            if (!response?.didCancel && response?.errorCode == undefined) {
                setFilePath(response);
                setLocalImage(true)
            }
        }
        catch (e) {
            throw e
        }
    }
    const handleImageUpload = async () => {
        try {
            const response = await chooseFile('photo')
            if (!response?.didCancel && response?.errorCode == undefined) {
                setFilePath(response);
                setLocalImage(true)
            }
        } catch (e) {
            throw e
        }

    };

    const downloadMarker = async () => {
        try {
            const marker = await getArucoMarkerPdf()


        }
        catch (e) {
            console.error(e)
        }
    }



    const measureIPD = async () => {
        try {
            const res = await sendImageToIPDServer(filePath)
            if (res.status == 200) {
                setSuccessMessage("Your IPD in mm is " + res.data.ipd_in_mm)
                setErrorMessage('')
                setErrorVisible(false)
            }

            setSuccessVisible(true)
        }
        catch (err) {
            setSuccessMessage('')
            setSuccessVisible(false)
            setErrorMessage(err.response.data.error)
            setErrorVisible(true)
        }
    }

    return (
        <Container >
            {
                !guidlineShown && (
                    <View style={styles.sec_container}>
                        <Text style={{ fontSize: 18, color: '#000', textAlign: 'justify' }}>
                            Please Align your face with the camera and make sure the lighting conditions are good. Place marker on your forehead or under your nose, and make sure it also aligns wells with the camera angle.
                            Sample Image is provided below which shows how to hold the marker

                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, marginTop: 5, width: '100%' }}>
                            <PrimaryButtonOutline style={{ width: '60%', }} onPress={downloadMarker} title={'Download Aruco Marker'} />
                            <PrimaryButtonOutline style={{ width: '25%' }} onPress={() => SetGuidelinesShow(true)} title={'Skip'} color={'blue'} />

                        </View>
                        <Image source={require('../../assets/images/persons/ipdDemo.jpg')} style={styles.demoImg}></Image>
                    </View>
                )
            }
            {
                guidlineShown &&
                <ScrollView contentContainerStyle={styles.sec_container} >
                    {successVisible &&
                        <Text style={{ color: 'green', fontSize: 16, alignSelf: 'flex-start', textAlign: 'center', alignSelf: 'center', paddingBottom: '2%' }}>
                            {successMessage}
                        </Text>
                    }{
                        errorVisible &&
                        <Text style={{ color: 'red', fontSize: 16, alignSelf: 'flex-start', textAlign: 'center', alignSelf: 'center', paddingBottom: '2%' }}>
                            {errorMessage}
                        </Text>
                    }
                    {localImage && (<Image source={{ uri: filePath.assets[0].uri }} style={styles.img} />)
                    }



                    <MediumButtonOutlineIcon icon={'camera'} title={'Capture Image'} color={'#000'} style={{ width: '100%' }} onPress={() => handleImageCapture()} />
                    <HorizontalDivider text={'OR'} lineStyle={{ color: '#ddd' }} style={{ marginVertical: 20 }} />
                    <View style={styles.upload_container}>
                        <TouchableOpacity style={{ alignItems: 'center', }} onPress={() => handleImageUpload()}>
                            <Image source={require('../../assets/images/upload.png')} style={styles.icon} />
                            <Text style={styles.blue_txt}>Tap to upload image</Text>
                        </TouchableOpacity>
                    </View>
                    <PrimaryButton title={'Measure IPD'} color={'#3056D3'} onPress={measureIPD} />
                </ScrollView>

            }
        </Container>
    );
};

const styles = StyleSheet.create({
    sec_container: {
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 17
    },
    img: {
        height: 200,
        width: 200,
        borderRadius: 200 / 2,
        marginVertical: 28
    },
    demoImg: {
        height: 400,
        width: '100%',
        // borderRadius: 200 / 2,
        marginVertical: 15
    },
    icon: {
        width: 45,
        height: 45
    },
    blue_txt: {
        color: '#3056D3',
        paddingTop: 15,
        textAlign: 'center',

    },
    upload_container: {
        borderWidth: 1.5,
        borderColor: '#3056D3',
        alignItems: 'center',
        width: '100%',
        padding: 15,
        borderStyle: 'dashed',
        borderRadius: 6,
        marginBottom: 28
    },
    med_btn: {
        width: '100%',
        marginVertical: 20
    },


});

export default CheckIPD;
