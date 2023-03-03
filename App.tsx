import "react-native-get-random-values";
import "@ethersproject/shims";

import Home from "./src/screens/Home";

import React, { useEffect, useState, useCallback } from "react";
import {
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from "react-native";

import useInitialization, { web3Provider } from "./src/hooks/useInitialization";
import {
	resetUniversalProviderSession,
	universalProvider,
	universalProviderSession,
} from "./src/utils/UniversalProvider";
import { ExplorerModal } from "./src/components/ExplorerModal";

export default function App() {
	const [modalVisible, setModalVisible] = useState(false);
	const [currentAccount, setCurrentAccount] = useState<string | null>(null);

	// Initialize universal provider
	const initialized = useInitialization();

	const close = () => {
		setModalVisible(false);
	};

	const getAddress = useCallback(async () => {
		try {
			const signer = web3Provider.getSigner();
			const currentAddress = await signer.getAddress();
			setCurrentAccount(currentAddress);
		} catch (err: unknown) {
			console.log("Error for initializing", err);
		}
	}, []);

	useEffect(() => {
		// NOTE: Logs to help developers debug
		// console.log('App Initialized: ', initialized);
		// console.log('useEffect currentWCURI', currentWCURI);
		if (universalProviderSession) {
			getAddress();
		}
	}, [initialized, getAddress, currentAccount, modalVisible]);

	useEffect(() => {
		console.log("unix prov sess", universalProviderSession);
	}, [universalProviderSession]);

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#070707",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{!universalProviderSession ? (
				<ExplorerModal modalVisible={modalVisible} close={close} />
			) : null}

			<View style={styles.container}>
				<TouchableOpacity
					onPress={() =>
						console.log("unix prov sess", universalProviderSession)
					}
					style={styles.connectWalletButton}
				>
					<Text style={styles.whiteText}>
						Print Connection Status
					</Text>
				</TouchableOpacity>
				{universalProviderSession ? (
					<View>
						<Text style={styles.whiteText}>👉🥺👈</Text>
						<Text style={styles.whiteText}>
							Address: {currentAccount}
						</Text>
						<TouchableOpacity
							onPress={() =>
								universalProvider.disconnect().then(() => {
									resetUniversalProviderSession();
								})
							}
							style={styles.connectWalletButton}
						>
							<Text style={styles.whiteText}>
								Disconnect Wallet
							</Text>
						</TouchableOpacity>
					</View>
				) : (
					<TouchableOpacity
						onPress={() => setModalVisible(true)}
						style={styles.connectWalletButton}
					>
						<Text style={styles.whiteText}>Connect Wallet</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
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
