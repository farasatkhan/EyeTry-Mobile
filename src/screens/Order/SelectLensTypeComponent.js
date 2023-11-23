import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedOptions } from '../../redux/actions/orderSelectionAction';
import { useNavigation } from '@react-navigation/native';
// import { viewParticularProduct } from '../../../../api/productsApi';
import { useParams } from '@react-navigation/native';
import API_URL from '../../config/config';

// import SunglassesLensPreview from '../OrderComponets/SunglassesLensPreview/SunglassesLensPreview';
// import TransitionLensPreview from '../OrderComponets/TransitionLensPreview/TransitionLensPreview';
import SelectGlassesType from "./SelectGlassesType";
import SelectPrescriptionOption from "./SelectPrescriptionOption";
import SelectPrescriptionType from "../Order/SelectPrescriptionType"
import EnterPrescription from "../Order/EnterPrescription"
import SaveOrderPrescription from "../Order/SaveOrderPrescription"
import ChooseLensPackage from "../Order/ChooseLensPackage"
// import SelectLensType from "../OrderComponets/SelectLensType"
// import AvailableCoatings from "../OrderComponets/AvailableCoatings"
// import ReviewSelections from "../OrderComponets/ReviewSelections"
// import SunglassesLensSelection from "../OrderComponets/SunglassesLensSelection"
// import TransitionLensSelection from "../OrderComponets/TransitionLensSelection"
import graysvg from '../../assets/svg/Order/gray.svg'
import { viewParticularProduct } from '../../services/Orders/orderApi';
viewParticularProduct
export default function SelectLensTypeScreen({ route }) {
  const navigation = useNavigation();

  const {productId} = route.params;

  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const selectedOptions = useSelector((state) => state.selectedOptions);

  // fetching product data
  useEffect(() => {
    getData(productId);
  }, [])

  const getData = async (productId) => {
    try {
      const productData = await viewParticularProduct(productId);
      console.log(productData)
      setProduct(productData)
    } catch (error) {
      throw error;
    }
  }
  
//   const dispatch = useDispatch();
//   const selectedOptions = useSelector((state) => state.selectedOptions);

  const schema = {
    lensProperties: {
      lensType: "",
      prescriptionType: "",
      package: "",
      coatings: "",
      glassesType: "",
      upgrades: "",
      transitionLens: {
        transitionType: "",
        color: ""
      },
      sunglassesLens: {
        sunglassesType: "",
        color: ""
      },

    },
    prescription: {
      pdType: "",
      pdOneNumber: null,
      pdLeftNumber: null,
      pdRightNumber: null,
      rightEyeOD: {
        SPH: "",
        CYL: "",
        Axis: "",
        Prism: "",
        Base: "",
      },
      leftEyeOS: {
        SPH: "",
        CYL: "",
        Axis: "",
        Prism: "",
        Base: "",
      },
      birthYear: null,
    },
  };



  // Define the handleGlassesTypeSelect function to update selectedOptions
  // Update handleSelectedOptions function to dispatch the action





  // animation effect
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // Trigger the animation when the component is mounted
    setLoaded(true);
    console.log("productId: " + productId)
  }, []);

//   const imageAnimationClass = loaded ? 'translate-y-0 opacity-100 transition-transform ease-out duration-1000' : 'translate-y-20 opacity-0';
//   const textAnimationClass = loaded ? 'translate-y-0 opacity-100 transition-transform ease-out duration-1000 delay-500' : 'translate-y-20 opacity-0';
//   const rightComponentAnimationClass = loaded ? 'translate-x-0 opacity-100 transition-transform ease-out duration-1000' : 'translate-x-20 opacity-0';

  const [customization, setCustomization] = useState({
    image: graysvg,
    name: 'Gray Polarized',
  });

  // Update the Lens customization state based on user input
  const handleCustomizationUpdate = (newCustomization) => {
    setCustomization(newCustomization);
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [previousScreen, setPreviousScreen] = useState(null);

  const handleNextStep = (nextStep) => {
    if (nextStep) {
      setPreviousScreen(currentStep);
      setCurrentStep(nextStep);
    } else if (currentStep < 15) {
      setPreviousScreen(currentStep);
      setCurrentStep(currentStep + 1);
    }
  };

  // managing previus states comming from child components
  const handlePreviousState = (state) => {
    setPreviousScreen(state)
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      if (currentStep <= 8) {
        setCurrentStep(currentStep - 1)
      }
      else if (currentStep === 8 || currentStep === 9) {
        setCurrentStep(7);
      }
      else if (currentStep === 10 && previousScreen === 8) {
        setCurrentStep(8);
      }
      else if (currentStep === 10 && previousScreen === 9) {
        setCurrentStep(9);
      }
      else if (previousScreen === 10) {
        setCurrentStep(7);
      }
      else {
        setCurrentStep(previousScreen);
      }
    }
    console.log("prev state: " + previousScreen)
  };

  let rightSideComponent;

  switch (currentStep) {
    case 1:
      rightSideComponent = <SelectGlassesType onNextStep={handleNextStep} />;
      break;
    case 2:
      rightSideComponent = <SelectPrescriptionOption onNextStep={handleNextStep} />;
      break;
    case 3:
      rightSideComponent = <SelectPrescriptionType onNextStep={handleNextStep} />;
      break;
    case 4:
      rightSideComponent = <EnterPrescription onNextStep={handleNextStep} />;
      break;
    case 5:
      rightSideComponent = <SaveOrderPrescription onNextStep={handleNextStep} />;
      break;
    case 6:
      rightSideComponent = <ChooseLensPackage onNextStep={handleNextStep} />
      break;
    case 7:
      rightSideComponent = <SelectLensType onNextStep={handleNextStep} />;
      break;
    case 8:
      rightSideComponent = <TransitionLensSelection onPreviousState={handlePreviousState} onUpdate={handleCustomizationUpdate} onNextStep={handleNextStep} />;
      break;
    case 9:
      rightSideComponent = <SunglassesLensSelection onUpdate={handleCustomizationUpdate} onNextStep={handleNextStep} />;
      break;
    case 10:
      rightSideComponent = <AvailableCoatings onNextStep={handleNextStep} />;
      break;
    case 11:
      rightSideComponent = <ReviewSelections selectedOptions={selectedOptions} />;
      break;
    default:
      rightSideComponent = null;
  }


  const goBack = () => {
    navigate(-1); // Go back to the previous page using useNavigate
  };

  // fetching product image
// Modify your productImage function to include CSS styles for the image
const productImage = (product) => {
  if (
    product &&
    product.frame_information &&
    product.frame_information.frame_variants &&
    product.frame_information.frame_variants[0] &&
    product.frame_information.frame_variants[0].images &&
    product.frame_information.frame_variants[0].images[0]
  ) {
    const path = product.frame_information.frame_variants[0].images[0];

    const completePath = API_URL + path;
    console.log("Image path is: " + completePath);

    return (
      <View className="">
        <Image
          className="w-[60%] mx-auto object-contain h-[120px]" // Adjust the dimensions as needed
          source={{ uri: completePath }}
          // alt="product"
        />
          {/* <Image
          style={{ width: '80%', height: 100, alignSelf: 'center', resizeMode: 'contain' }}
          source={{ uri: "http://localhost:3000/uploads/products/glasses/e678463bb99d2ac2032cc43b18fb9163.webp" }}
        /> */}
      </View>
    );
  }
};

return (
    <>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        {/* section 1 */}
        <View className="bg-white h-[30%]">
          {/* <TouchableOpacity onPress={() => navigation.goBack()} disabled={currentStep === 1}>
            <Text style={{ marginLeft: 10, marginTop: 10, width: '20%', fontSize: 16, fontWeight: 'bold', marginBottom: 2, color: 'blue' }}>
              {'<'} <Text style={{ textDecorationLine: 'underline' }}>Back to frame</Text>
            </Text>
          </TouchableOpacity> */}
          <View className="mt-4">
          {productImage(product)}
          </View>

          {currentStep !== 8 && currentStep !== 9 && (
            <>
              <View className="pl-4 pr-4 mt-2 flex flex-row h-[]">
                <View className="w-[80%] ">
                <Text style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 'bold'}} numberOfLines={1} ellipsizeMode='tail'>{product.name}</Text>
                  <Text style={{ fontFamily: 'sans-serif', fontSize: 12, fontWeight: '600'}}>{product.manufacturer}</Text>
                </View>
                <View className="w-[20%]">
                  {product && product.priceInfo ? (
                    <Text className="color-gray-700" style={{ fontFamily: 'sans-serif', fontSize: 16, fontWeight: 'bold' }}>{product.priceInfo.price} {product.priceInfo.currency}</Text>
                  ) : (
                    <Text style={{ marginTop: 5, color: 'blue' }}>
                      price (Loading...)
                    </Text>
                  )}
                </View>
              </View>
              {/* <View style={{ backgroundColor: '#f1f1f1', borderRadius: 8, padding: 8, marginVertical: 8, transform: [] }}>
                <Text style={{ fontFamily: 'sans-serif', fontSize: 16, fontWeight: 'bold', marginRight: 10, marginBottom: 2 }}>Frame Description</Text>
                <Text style={{ fontFamily: 'sans-serif', fontSize: 14 }}>{product.description}</Text>
              </View> */}
            </>
          )}
        </View>

        {/* section 2 */}
        <View className="rounded-t-2xl mt-[-5] h-[70%] bg-gray-100">
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <TouchableOpacity onPress={handlePreviousStep} disabled={currentStep === 1}>
              <Text className="font-sans font-bold color-blue-800 ml-8">{'<'}<Text style={{ textDecorationLine: 'underline' }}>Back</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ flex: 1, marginRight:8, marginLeft:8}}>
            {rightSideComponent}
          </ScrollView>
        </View>
      </View>
    </>
  );
}
