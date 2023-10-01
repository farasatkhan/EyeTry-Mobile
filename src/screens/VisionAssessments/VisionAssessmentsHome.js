import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VisionAssessmentHome = () => {

    const navigation = useNavigation();

    const handleVisualAcuityClick = () => {
        navigation.navigate('VisionAcuityInfo')
    }
    const handleColorBlindClick = () => {
        navigation.navigate('ColorBlindInfo')
    }
    const handleSensitivityClick = () => {
        navigation.navigate('ContrastSensitivityInfo')
    }
    const handleAstigmatismInfoClick = () => {
        navigation.navigate('AstigmatismInfo')
    }

    return (
        <View style={styles.container}>
            <View style={styles.section1}>
                <View style={styles.bannerText}>
                    <Text style={styles.bannerInsideHeader}>Eye Test</Text>
                    <Text style={styles.bannerInsideText}>This app offers basic vision tests that can measure Vision
                     Acuity Test, Color Blind Test, Contrast Sensitivity Test and the Astigmatism Test</Text>
                </View>
                <View style={styles.bannerImg}>
                    <Image
                        source={require('../../assets/images/visionAssessments/eye-test.png')}
                        style={{ height: "100%", width: "100%", resizeMode: 'contain' }}
                    />
                </View>

            </View>
            <View style={styles.section2}>
                <View style={styles.testSection1}>
                    <TouchableOpacity style={styles.vissionAcuity} onPress={() => handleVisualAcuityClick()}>
                        <View style={styles.circle}>
                            <Image
                                source={require('../../assets/images/visionAssessments/acuity.png')}
                                style={{ height: "90%", width: "90%", resizeMode: 'contain' }}
                            />
                        </View>
                        <Text>Visual Acuity</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.colorBlind} onPress={() => handleColorBlindClick()}>
                        <View style={styles.circle2}>
                            <Image
                                source={require('../../assets/images/visionAssessments/colorblind.png')}
                                style={{ height: "100%", width: "100%", resizeMode: 'contain' }}
                            />
                        </View>
                        <Text>Color Blind</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.testSection2}>
                    <TouchableOpacity style={styles.contrastSensitivity} onPress={() => handleSensitivityClick()}>
                        <View style={styles.circle3}>
                            <Image
                                source={require('../../assets/images/visionAssessments/contrast.png')}
                                style={{ height: "90%", width: "90%", resizeMode: 'contain' }}
                            />
                        </View>
                        <Text>Contrast Sensitivity</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.astigmatism} onPress={() => handleAstigmatismInfoClick()}>
                        <View style={styles.circle4}>
                            <Image
                                source={require('../../assets/images/visionAssessments/astigmatism.png')}
                                style={{ height: "90%", width: "90%", resizeMode: 'contain' }}
                            />
                        </View>
                        <Text>Astigmatism</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    section1: {
        height: "25%",
        width: "90%",
        backgroundColor: "#0F97B1",
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20

    },
    section2: {
        height: "55%",
        width: "90%",
        backgroundColor: "#F5F5F5",
        borderRadius: 5,
        padding: 30
    },
    bannerText: {
        width: "60%",
        height: "70%",
        padding: 10,
        paddingLeft: 15
    },
    bannerImg: {
        width: "40%",
        height: "70%",
    },
    bannerInsideText: {
        textAlign: 'justify',
        fontSize: 12,
        color: "white",
        fontWeight: '600'
    },
    bannerInsideHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "white"
    },
    testSection1: {
        flexDirection: 'row',
        height: "50%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'

    },
    testSection2: {
        flexDirection: 'row',
        height: "50%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',

    },
    vissionAcuity: {
        height: "93%",
        width: "50%",
        backgroundColor: "white",
        marginRight: 5,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1


    },
    colorBlind: {
        height: "93%",
        width: "50%",
        backgroundColor: "white",
        marginLeft: 5,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1

    },
    contrastSensitivity: {
        height: "93%",
        width: "50%",
        backgroundColor: "white",
        marginRight: 5,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1


    },
    astigmatism: {
        height: "93%",
        width: "50%",
        backgroundColor: "white",
        marginLeft: 5,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1
    },
    circle: {
        width: "60%",
        height: "60%",
        backgroundColor: "#88D2E1",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
    circle2: {
        width: "60%",
        height: "60%",
        backgroundColor: "#E4EBED",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
    circle3: {
        width: "60%",
        height: "60%",
        backgroundColor: "#E9E9D6",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
    circle4: {
        width: "60%",
        height: "60%",
        backgroundColor: "#F9DDCA",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    }


});

export default VisionAssessmentHome;
