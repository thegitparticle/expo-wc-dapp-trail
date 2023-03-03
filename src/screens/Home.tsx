import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#070707",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Text style={styles.whiteText}>👉🥺👈</Text>
			<Text style={styles.whiteText}>Address</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "black",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	blueText: {
		color: "blue",
		textAlign: "center",
		fontWeight: "700",
	},
	whiteText: {
		color: "white",
		textAlign: "center",
		fontWeight: "700",
	},
	connectWalletButton: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		color: "white",
		backgroundColor: "firebrick",
		borderRadius: 20,
		width: 150,
		height: 50,
		borderWidth: 1,
		borderColor: "rgba(0, 0, 0, 0.1)",
	},
});
