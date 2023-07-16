import { PersonalIdentityNFTABI, CONTRACT_ADDRESS } from "../utils/contract"; 
import { useState, useEffect } from 'react';
import {
  Box,
  Center,
  Stack,
  Image,
  Button,
  useToast
} from "@chakra-ui/react";
import { useWaitForTransaction, useAccount } from "wagmi";
import { useContractWrite } from "wagmi"; // Replace with the correct import for useContractWrite

const NFTForm = () => {
  const [tokenId, setTokenId] = useState('');
  const [personalInfo, setPersonalInfo] = useState('');
  const [achievements, setAchievements] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [socialMediaProfiles, setSocialMediaProfiles] = useState('');
  const [mediaData, setMediaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const toast = useToast();
  const [mintedNFTs, setMintedNFTs] = useState([]);

  const { isSuccess, mutate } = useContractWrite({
    abi: PersonalIdentityNFTABI, // Replace with the ABI for your contract
    address: CONTRACT_ADDRESS,
    functionName: "mintNFT",
    onError: (error) => {
      console.log("Error", error);
    },
    onSuccess: (result) => {
      console.log("Success", result);
      setMintedNFTs((prevMintedNFTs) => [
        ...prevMintedNFTs,
        tokenId // Add the newly minted NFT tokenId to the array
      ]);
    },
  });

  const { data: transactionData } = useWaitForTransaction({ hash: isSuccess ? isSuccess.transactionHash : null });

  useEffect(() => {
    console.log("isSuccess", isSuccess);
    console.log("transactionData", transactionData);
    if (isSuccess) {
      toast({
        title: "NFT Minted",
        description: "Your NFT has been minted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    // Add conditions to handle error and other scenarios if needed
  }, [isSuccess, transactionData]);

  const handleMintNFT = async () => {
    try {
      const tokenIDValue = tokenId; // Replace with the actual value for tokenId
      const personalInfoValue = personalInfo; // Replace with the actual value for personalInfo
      const achievementsValue = achievements; // Replace with the actual value for achievements
      const qualificationsValue = qualifications; // Replace with the actual value for qualifications
      const socialMediaProfilesValue = socialMediaProfiles; // Replace with the actual value for socialMediaProfiles
      const ipfsHashValue = "IPFS Hash"; // Replace with the actual value for ipfsHash

      setLoading(true);
      await mutate({
        arguments: [
          tokenIDValue,
          personalInfoValue,
          achievementsValue,
          qualificationsValue,
          socialMediaProfilesValue,
          ipfsHashValue,
        ],
      });
      setLoading(false);

      console.log("NFT minted successfully!");
      window.alert("You successfully minted an NFT!");
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  };

  const handleMediaDataChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const mediaDataURL = reader.result;
        setMediaData(mediaDataURL);
      };
    }
  };

  return (
    <Center py={12}>
      <Box
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={"#fefefe40"}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: mediaData ? `url(${mediaData})` : "none",
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          {mediaData && (
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"cover"}
              src={mediaData}
              alt="NFT Image"
            />
          )}
        </Box>
        <Stack pt={10} align={"center"}>
          <input
            type="text"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="Token ID"
          />
          <input
            type="text"
            value={personalInfo}
            onChange={(e) => setPersonalInfo(e.target.value)}
            placeholder="Personal Info"
          />
          <input
            type="text"
            value={achievements}
            onChange={(e) => setAchievements(e.target.value)}
            placeholder="Achievements"
          />
          <input
            type="text"
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
            placeholder="Qualifications"
          />
          <input
            type="text"
            value={socialMediaProfiles}
            onChange={(e) => setSocialMediaProfiles(e.target.value)}
            placeholder="Social Media Profiles"
          />
          <input
            type="file"
            onChange={handleMediaDataChange}
            accept="image/*"
          />
          <Button
            bg={"#c3a6ff80"}
            color={"gray.700"}
            border={3}
            borderColor={"gray.500"}
            borderRadius={"lg"}
            shadow={"2xl"}
            _hover={{
              bg: "#c3a6ff",
              opacity: 10,
            }}
            onClick={handleMintNFT}
            disabled={loading} // Disable the button while minting
          >
            {loading ? "Minting..." : "Mint NFT"}
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default NFTForm;
