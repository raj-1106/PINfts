import NFTForm from "../components/NFTForm";
import { useToast } from "@chakra-ui/react";
import { PersonalIdentityNFTABI } from "../utils/contract"; // Import the ABI for your contract
import { useContractWrite, useWaitForTransaction, useAccount } from "wagmi";

const CONTRACT_ADDRESS = "0xe7d22Dc2b61006e0877C23E47C050a5d9C24957a"; // Replace with your contract address

export default function Home() {
  const { address } = useAccount();
  const toast = useToast();

  const handleMintNFT = async (tokenId, personalInfo, achievements, qualifications, socialMediaProfiles) => {
    const { data, write, error } = useContractWrite({
      abi: PersonalIdentityNFTABI, // Replace with the ABI for your contract
      address: CONTRACT_ADDRESS,
      functionName: "mintNFT",
      args: [
        tokenId,
        personalInfo,
        achievements,
        qualifications,
        socialMediaProfiles,
        "IPFS Hash",
      ],
      onError: (error) => {
        console.log("Error", error);
      },
      onSuccess: (result) => {
        console.log("Success", result);
      },
    });

    const { isSuccess } = useWaitForTransaction({ hash: data?.hash });

    useEffect(() => {
      console.log("isSuccess", isSuccess);
      console.log("error", error);
      if (isSuccess) {
        toast({
          title: "NFT Minted",
          description: "Your first NFT has been minted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      if (error) {
        toast({
          title: "Error",
          description: "There was an error minting this token: " + error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }, [isSuccess, error]);

    write?.();
  };

  return (
    <>
      <NFTForm handleMintNFT={handleMintNFT} />
    </>
  );
}
