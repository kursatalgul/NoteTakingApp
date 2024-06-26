import { useTheme } from "@react-navigation/native";

const getStyles = () => {
    const { colors } = useTheme();
  
    const result = {
      input: {
        width: "100%",
        backgroundColor: 'white',
        height: 50,
        opacity: 0.9,
        paddingLeft: 15,
        shadowRadius: 5,
        marginBottom: 10,
        borderRadius: 10,
      },
      inputText: {
        opacity: 1,
        color: "#ffffff", 
      },
    };
  
    return result;
  };
  

export default getStyles;
