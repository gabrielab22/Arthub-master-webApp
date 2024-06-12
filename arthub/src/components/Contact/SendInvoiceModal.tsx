import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { CartItem } from "../../types";
import { useNavigate } from "react-router-dom";

interface SendInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
}

const SendInvoiceModal: React.FC<SendInvoiceModalProps> = ({
  isOpen,
  onClose,
  cartItems,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const userEmail = "gbilan22@yahoo.com";
  const toast = useToast();
  const navigate = useNavigate();

  const handleSendEmail = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/contact/sendInvoice", {
        email: userEmail,
        cartItems,
      });
      console.log("Email sent successfully:", response.data);
      toast({
        title: "Invoice Sent",
        description: "Your invoice has been sent to your email.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      navigate("/");
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    onClose();
    navigate("/");
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Send Invoice</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <h2 style={{ fontWeight: "bold" }}>Thank you for your order!</h2>
          <p style={{ marginBottom: "16px" }}>
            Do you want the invoice to be sent to your email ({userEmail})?
          </p>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSendEmail}
            isLoading={isLoading}
          >
            Send
          </Button>
          <Button
            variant="ghost"
            onClick={handleCloseModal}
            disabled={isLoading}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SendInvoiceModal;
