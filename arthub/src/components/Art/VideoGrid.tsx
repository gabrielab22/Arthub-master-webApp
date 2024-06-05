import React from "react";
import { SimpleGrid, Box, AspectRatio, Center } from "@chakra-ui/react";
import TextContent from "./TekstContent";
import { horizontalVideos, verticalVideos } from "./constants";

const VideoGrid = () => {
  return (
    <>
      <SimpleGrid columns={[1, null, 2, 4]} gap={4} p={4}>
        {verticalVideos.map((video, index) => (
          <Box key={index} boxShadow="md" borderRadius="md" overflow="hidden">
            <AspectRatio ratio={20 / 30} maxW="360px">
              <video controls width="320" height="150">
                <source src={video.url} type="video/mp4" />
              </video>
            </AspectRatio>
          </Box>
        ))}
      </SimpleGrid>
      <Center mt={8}>
        <Box p={8} borderWidth="1px" borderRadius="lg" maxW="800px">
          <TextContent />
        </Box>
      </Center>
      <SimpleGrid columns={[1, null, 2, 4]} gap={4} p={4}>
        {horizontalVideos.map((video, index) => (
          <Box key={index} boxShadow="md" borderRadius="md" overflow="hidden">
            <AspectRatio ratio={16 / 9}>
              <video controls className="full-screenable-video">
                <source src={video.url} type="video/mp4" />
              </video>
            </AspectRatio>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default VideoGrid;
