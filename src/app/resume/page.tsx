"use client";

import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Box,
  Container,
  Heading,
  Button,
  Flex,
  Text,
  Spinner,
  ButtonGroup,
  Icon,
  Alert,
} from "@chakra-ui/react";
import {
  LuDownload,
  LuZoomIn,
  LuZoomOut,
  LuChevronLeft,
  LuChevronRight,
  LuMaximize,
} from "react-icons/lu";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export default function ResumePage() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const pdfUrl = "/documents/resume.pdf";

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setLoading(false);
      setError(null);
    },
    []
  );

  const onDocumentLoadError = useCallback((error: Error) => {
    setError(`Failed to load PDF: ${error.message}`);
    setLoading(false);
  }, []);

  const changePage = useCallback(
    (offset: number) => {
      setPageNumber((prevPageNumber) =>
        Math.min(Math.max(prevPageNumber + offset, 1), numPages)
      );
    },
    [numPages]
  );

  const previousPage = useCallback(() => changePage(-1), [changePage]);
  const nextPage = useCallback(() => changePage(1), [changePage]);

  const zoomIn = useCallback(
    () => setScale((prevScale) => Math.min(prevScale * 1.2, 3.0)),
    []
  );
  const zoomOut = useCallback(
    () => setScale((prevScale) => Math.max(prevScale / 1.2, 0.5)),
    []
  );
  const resetZoom = useCallback(() => setScale(1.0), []);

  const downloadPdf = useCallback(() => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Kwame_Amosah_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [pdfUrl]);

  return (
    <Container maxW="container.xl" py={8}>
      <Box textAlign="center" mb={8}>
        <Heading as="h1" size="2xl" mb={4}>
          My Resume
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={6}>
          Frontend Engineer | React & TypeScript Specialist
        </Text>

        {/* Control Buttons */}
        <Flex justify="center" align="center" gap={4} wrap="wrap" mb={6}>
          <ButtonGroup variant="outline" size="sm">
            <Button onClick={zoomOut} disabled={scale <= 0.5}>
              <Icon as={LuZoomOut} mr={2} />
              Zoom Out
            </Button>
            <Button onClick={resetZoom}>
              <Icon as={LuMaximize} mr={2} />
              {Math.round(scale * 100)}%
            </Button>
            <Button onClick={zoomIn} disabled={scale >= 3.0}>
              <Icon as={LuZoomIn} mr={2} />
              Zoom In
            </Button>
          </ButtonGroup>

          <Button colorScheme="blue" size="sm" onClick={downloadPdf}>
            <Icon as={LuDownload} mr={2} />
            Download PDF
          </Button>
        </Flex>

        {/* Page Navigation */}
        {numPages > 1 && (
          <Flex justify="center" align="center" gap={4} mb={6}>
            <Button
              onClick={previousPage}
              disabled={pageNumber <= 1}
              size="sm"
              variant="ghost"
            >
              <Icon as={LuChevronLeft} mr={2} />
              Previous
            </Button>
            <Text fontSize="sm" color="gray.600">
              Page {pageNumber} of {numPages}
            </Text>
            <Button
              onClick={nextPage}
              disabled={pageNumber >= numPages}
              size="sm"
              variant="ghost"
            >
              Next
              <Icon as={LuChevronRight} ml={2} />
            </Button>
          </Flex>
        )}
      </Box>

      {/* PDF Viewer */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="600px"
        position="relative"
      >
        {loading && (
          <Flex direction="column" align="center" gap={4}>
            <Spinner size="xl" color="blue.500" />
            <Text>Loading resume...</Text>
          </Flex>
        )}

        {error && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Error</Alert.Title>
              <Alert.Description>{error}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}

        {!error && (
          <Box
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="xl"
            bg="white"
          >
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading=""
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderAnnotationLayer={true}
                renderTextLayer={true}
              />
            </Document>
          </Box>
        )}
      </Box>

      {/* Additional Information */}
      <Box mt={8} textAlign="center">
        <Text fontSize="sm" color="gray.500">
          Having trouble viewing the PDF? You can{" "}
          <Button
            variant="plain"
            size="sm"
            color="blue.500"
            onClick={downloadPdf}
          >
            download it directly
          </Button>
          .
        </Text>
      </Box>
    </Container>
  );
}
