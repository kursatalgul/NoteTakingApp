import { useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { AuthContext } from "../context/AuthContext";

const Header = ({ route, navigation }) => {
  const { setAuth } = useContext(AuthContext);
  const logout = () => {
    setAuth({});
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerName}>{route.name}</Text>
      {route.name === "Notes" && (
        <TouchableOpacity onPress={logout}>
          <Text>Çıkış</Text>
        </TouchableOpacity>
      )}
      {route.name !== "Notes" && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>X</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 16,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    width: "100%",
    height: 75,
    backgroundColor: "#fff",
  },
  headerName: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
