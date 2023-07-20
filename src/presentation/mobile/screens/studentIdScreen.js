import React, { useState } from "react";
import { Alert, Dimensions, ImageBackground, SafeAreaView } from "react-native";
import {
  StyleSheet,
  View,
  Image,
  Button,
  Pressable,
  TextInput,
  Text,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, getStudentInfo } from "../store/actions/actions";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import colors from "../constants/colors";
import { useEffect } from "react";
import {
  ActivityIndicator,
  shadow,
  Portal,
  Dialog,
  PaperProvider,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  Layout,
  TopNavigation,
  Divider,
  BottomNavigation,
  BottomNavigationTab,
  Modal,
  Card,
} from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  withSpring,
  runOnJS,
  runOnUI,
} from "react-native-reanimated";
import { useRef } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";

export default studentIdScreen = (props) => {
  const onTeacher = () => props.navigation.navigate("Login");

  const [studentInfo, setstudentInfo] = useState(null);
  

  if(studentInfo)
  {
  console.log(studentInfo.fullName);
  }

  const translateX = useSharedValue(0);
  const lenght = useRef(144);
  const prevValue = useRef(0);

  const [text, setText] = useState(false);

  const [visible, setVisible] = useState(false);
  const [showInfo, setshowInfo] = useState(false);
  const [error, seterror] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      prevValue.current = translateX.value;
    },
    onActive: (event) => {
      const distance = Math.sqrt(translateX.value ** 2);

      if (!(event.velocityX > 0)) {
        translateX.value = -(event.translationX + prevValue.current);
        return;
      }
    },
    onEnd: (event) => {
      const distance = Math.sqrt(translateX.value ** 2);

      if (distance >= lenght.current / 2 && event.velocityX <= 0) {
        translateX.value = withSpring(lenght.current);
        runOnJS(onTeacher)();
      } else {
        translateX.value = withTiming(0, 3000);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: -translateX.value }], zIndex: 1 };
  });

  const dispatch=useDispatch();
  const onSearch = async () => {

    const regX=/^[A-Z]|[a-z][0-9]{1,10}?$/;
    
    if(!text)
    {
      seterror("Kankore ID required!");
      return;
    }
    try{
       setisLoading(true);
      const resp=await dispatch(getStudentInfo(text));
     
      setstudentInfo( {...resp});
      setisLoading(false);
      setshowInfo(true);

    }
    catch(err)
    {
      setisLoading(false);
      console.log(err.message);
      Alert.alert("Error!",err.message);
    }
  
  };
  const { height, width } = Dimensions.get("screen");
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, width: "100%",
    height: "100%", }}>
      <LinearGradient
        colors={["#5DA3FF", "#00157D"]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
    
      <View style={{width:"90%",height:"15%" ,justifyContent:'flex-start',alignItems:'center',marginTop:"5%"}}>
      <Text style={{fontSize:20,color:"white"}}>Welcome To Kandahar University</Text>
      <Text style={{fontSize:20,color:"white"}}>
        Application
      </Text>
      <Text style={{fontSize:20,color:"white"}}>Enter Your Kankor ID To See The Result</Text>
      </View>
      
   
      <View style={{height:"60%",width:"100%",justifyContent:"flex-start",alignItems:"center"}}>
        <View style={styles.inputFieldsContainer}>
          <View style={!error?styles.inputContainer:styles.invalid}>
            <TextInput
              style={styles.inputField}
              placeholder="Type your Kankor ID"
              keyboardType="web-search"
              autoCapitalize="none"
              returnKeyType="search"
              onSubmitEditing={onSearch}
              value={text}
              onChangeText={(Id) => {
               if(!(Id==""))
               {seterror(false);}
                
                setText(Id)}}
            />

            <Pressable onPress={onSearch} style={{ marginRight: "2%" }}>
            {isLoading?<ActivityIndicator color="blue" size={20}></ActivityIndicator>:<ImageBackground
                style={{ height: 30, width: 30 }}
                source={require("../assets/images/search.png")}
              ></ImageBackground>}
              
            </Pressable>
          </View>
          {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <></>
            )}
        </View>
        
        {showInfo?<View style={{height:120}}>

<View style={{height:"70%",width:"90%",backgroundColor:"white",flexDirection:'row',borderRadius: 8,alignItems:'center'}}>


<View style={{justifyContent:'space-around',alignItems:"center",height:"80%",width:"25%"}}>
  <View style={{height:"40%",justifyContent:"center"}}><Text style={{fontSize:12}}>Name</Text></View>
  <View style={{width:"95%",backgroundColor:"gray",borderWidth:1,height:"3%"}}></View>
  <View style={{height:"56%"}}><Text style={{fontSize:12}}>{studentInfo?studentInfo.fullName:""}</Text></View>

  </View>

    <View style={{justifyContent:'space-around',alignItems:"center",height:"80%",width:"25%"}}>
  <View style={{height:"40%",justifyContent:"center"}}><Text style={{fontSize:12}}>Father Name</Text></View>
  <View style={{width:"95%",backgroundColor:"gray",borderWidth:1,height:"3%"}}></View>
  <View style={{height:"56%"}}><Text style={{fontSize:12}}>{studentInfo?studentInfo.fatherName:""}</Text></View>

  </View>

  <View style={{justifyContent:'space-around',alignItems:"center",height:"80%",width:"25%"}}>
  <View style={{height:"40%",justifyContent:"center"}}><Text style={{fontSize:12}}>G/F Name</Text></View>
  <View style={{width:"95%",backgroundColor:"gray",borderWidth:1,height:"3%"}}></View>
  <View style={{height:"56%"}}><Text style={{fontSize:12}}>{studentInfo?studentInfo.grandFatherName:""}</Text></View>

  </View>

  <View style={{justifyContent:'space-around',alignItems:"center",height:"80%",width:"25%"}}>
  <View style={{height:"40%",justifyContent:"center"}}><Text style={{fontSize:12}}>Kankor ID</Text></View>
  <View style={{width:"95%",backgroundColor:"gray",borderWidth:1,height:"3%"}}></View>
  <View style={{height:"56%"}}><Text style={{fontSize:12}}>{studentInfo.kankorId}</Text></View>

  </View>


</View>

<View style={{alignSelf:"flex-end",justifyContent:'center',alignItems:'center',height:"30%"}}>

<TouchableOpacity onPress={()=>setVisible(true)}
 style={{height:"90%",width:"30%",backgroundColor:"white",justifyContent:"center",alignItems:"center",borderRadius: 5,}}>
<Text style={{padding:5,fontSize:16,textAlign:"center"}}>Profile</Text>
</TouchableOpacity>


</View>

</View>:<View></View>}
        

        </View>

        <View
          style={{
            height: 50,
            width: "70%",
            borderRadius: 15,
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "5%",
          }}
        >
          <TouchableOpacity
            style={{
              width: "50%",
              justifyContent: "center",
              borderRadius: 15,
              backgroundColor: "white",
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                ...styles.Text,
                textAlign: "center",
                color: "#EB6A70",
              }}
            >
              Teacher
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              borderRadius: 15,
              zIndex: 1,
            }}
          >
            <PanGestureHandler onGestureEvent={panGestureEvent}>
              <Animated.View
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  borderRadius: 15,
                  alignItems: "center",

                  ...rStyle,
                }}
                onLayout={(event) => {
                  var { width } = event.nativeEvent.layout;
                  lenght.current = width;
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: "#EB6A70",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    borderRadius: 15,
                  }}
                >
                  <Text
                    style={{
                      ...styles.Text,
                      textAlign: "center",
                    }}
                  >
                    Student
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </PanGestureHandler>
          </View>
        </View>

        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
        >
          <View
            style={{
              height: height / 3.4,
              width: width / 1.1,
              backgroundColor: "white",
              justifyContent: "flex-start",
              flexDirection:"row",
              borderRadius: 8,
            }}
          >
           <View style={{width:"60%",height:"100%",justifyContent:"center",alignItems:'center'
           }}>
          <View style={{height:"60%",justifyContent:'center',alignItems:'center'}}>
            <View style={{height:50,width:50,borderRadius:25}}>
              <ImageBackground style={{height:"100%",width:"100%",borderRadius:25,overflow:'hidden'}} source={require("../assets/images/studentProfile.jpg")}></ImageBackground>
            </View>
            <Text style={{fontSize:18}}>{studentInfo? studentInfo.fullName:""}</Text>
            <Text style={{fontSize:15,backgroundColor:"#348feb",borderRadius:3,padding:3}}>{studentInfo?studentInfo.nickName:""}</Text>
          </View>
          <View style={{height:"40%",justifyContent:"center",alignItems:'center'}}>
            <View style={{width:"100%",flexDirection:'row',justifyContent:'flex-start'}}>
              <View style={{width:"40%",backgroundColor:"#34dbeb",borderRadius:3,alignItems:"center"}}><Text style={{fontSize:10}}>Database ID:{studentInfo?studentInfo.id:""}</Text></View>
              <View style={{marginLeft:"5%",width:"50%",backgroundColor:"#34dbeb",alignItems:"center",borderRadius:3}}><Text style={{fontSize:10}}>Admission year:{studentInfo?studentInfo.admissionYear:"Not available"}</Text></View>
            </View>
            <View style={{width:"70%",justifyContent:'center',alignItems:'center',backgroundColor:"#34dbeb",borderRadius:3,marginTop:"2%"}}>
            <View style={{}}><Text style={{fontSize:10}}>Kankor ID :{studentInfo?studentInfo.kankorId:""}</Text></View>
            </View>
            <View style={{width:"50%",justifyContent:'center',alignItems:'center',backgroundColor:"#34dbeb",borderRadius:3,marginTop:"2%"}}>
            <View style={{}}><Text style={{fontSize:10}}>Kankor Year :{studentInfo?studentInfo.educationalYearId:""}</Text></View>
            </View>

          </View>
           </View>
           <View style={{width:"1%",height:"100%",backgroundColor:"gray"}}>

           </View>
           <View style={{width:"39%",height:"100%",justifyContent:'center',alignItems:'center',}}>
          <View style={{width:"100%",height:"35%",marginLeft:"10%",justifyContent:"space-around"}}>
          <View style={{width:"100%",height:"70%"}}>
            <Text style={{fontSize:15}}>BIOGRAPHY</Text>
            <Text style={{fontSize:11}}>Student all personal</Text>
            <Text style={{fontSize:11}}>Infomration</Text>
            </View>
            <View style={{width:"40%",height:"20%",backgroundColor:"#ebbd34",borderRadius:3,justifyContent:"space-around",alignItems:"center",flexDirection:"row"}}>
               <ImageBackground style={{width:10,height:10}} source={require("../assets/images/user.png")}></ImageBackground>
               <Text style={{fontSize:9}}>Personal</Text>
            </View>
          </View>
          <View style={{width:"90%",height:"0.2%",backgroundColor:'gray',borderWidth:1}}></View>
          <View style={{width:"100%",height:"64%",justifyContent:"space-around"}}>
        
           <View  style={{width:"100%",height:"23%",justifyContent:"space-around"
           ,flexDirection:"row"}} 
          
           >
             <View style={{width:"20%"}}> 
          <View style={{height:30,width:30,borderRadius:15,backgroundColor:"#32a852",justifyContent:"center",alignItems:"center"}}
          >
            <Text style={{fontSize:16}}>FN</Text>
          </View>
          </View>
          <View style={{justifyContent:"flex-start",width:"70%"}}>       
              <Text numberOfLines={2} ellipsizeMode="tail" style={{fontSize:10}}>{studentInfo? studentInfo.fullName:""}</Text>
           <Text style={{fontSize:7}}>Full Name</Text>
           </View>

           </View>

           <View  style={{width:"100%",height:"23%",justifyContent:"space-around"
           ,flexDirection:"row"}} 
          
           >
           <View style={{width:"20%"}}> 
          <View style={{height:30,width:30,borderRadius:15,backgroundColor:"#32a852",justifyContent:"center",alignItems:"center"}}
          >
            <Text style={{fontSize:16}}>LN</Text>
          </View>
          </View>
          <View style={{justifyContent:"flex-start",width:"70%"}}>       
              <Text numberOfLines={2} ellipsizeMode="tail" style={{fontSize:10}}>{studentInfo?studentInfo.nickName:""}</Text>
           <Text style={{fontSize:7}}>Last Name</Text>
           </View>

           </View>


           <View  style={{width:"100%",height:"23%",justifyContent:"space-around"
           ,flexDirection:"row"}} 
          
           >
           <View style={{width:"20%"}}> 
          <View style={{height:30,width:30,borderRadius:15,backgroundColor:"#32a852",justifyContent:"center",alignItems:"center"}}
          >
            <Text style={{fontSize:16}}>FN</Text>
          </View>
          </View>
          <View style={{justifyContent:"flex-start",width:"70%"}}>       
              <Text numberOfLines={2} ellipsizeMode="tail" style={{fontSize:10}}>{studentInfo?studentInfo.fatherName:""}</Text>
           <Text style={{fontSize:7}}>Father Name</Text>
           </View>

           </View>


           <View  style={{width:"100%",height:"23%",justifyContent:"space-around"
           ,flexDirection:"row"}} 
          
           >
             <View style={{width:"20%"}}> 
          <View style={{height:30,width:30,borderRadius:15,backgroundColor:"#32a852",justifyContent:"center",alignItems:"center"}}
          >
            <Text style={{fontSize:16}}>GN</Text>
          </View>
          </View>
          <View style={{justifyContent:"flex-start",width:"70%"}}>       
              <Text numberOfLines={2} ellipsizeMode="tail" style={{fontSize:10}}>{studentInfo?studentInfo.grandFatherName:""}</Text>
           <Text style={{fontSize:7}}>Grand Father Name</Text>
           </View>

           </View>


          </View>
           </View>
           
          </View>
        </Modal>
      </LinearGradient>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: "100%",
    flex: 1,
  },
  inputFieldsContainer: {
    height: 100,
    justifyContent: "space-around",
    alignContent: "center",
  },
  inputContainer: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  inputField: {
    padding: 14,
    fontSize: 22,
    width: "90%",
    shadowColor: colors.secondry,
  },
  Text: {
    fontSize: 18,
    color: "white",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  errorText:{
    color:"red",
  },
  
  invalid:{
    backgroundColor: "white",
    width: "90%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    borderColor:"red",
    borderWidth:1
  }
});
