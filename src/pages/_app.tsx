import {
  ChakraProvider,
  Flex,
  cookieStorageManagerSSR,
} from "@chakra-ui/react";
import "@fontsource/noto-kufi-arabic";
import "@fontsource/pt-serif";
import "@fontsource/rakkas";
import { QueryClient, QueryClientProvider } from "react-query";
import { GetServerSidePropsContext } from "next";
import { CalendarProvider } from "@/context/UseCalendar";
import { DistributionProvider } from "@/context/UseDistribution";
import FloatingNavButtons from "@/components/FloatingNavButtons";
// import "../../index.css";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      cacheTime: 1000 * 60 * 60,
    },
  },
});

function App({ Component, pageProps: { ...pageProps }, cookies }: any) {

  return (
    <ChakraProvider
      colorModeManager={cookieStorageManagerSSR(cookies)}
      portalZIndex={40}
    >
      <QueryClientProvider client={queryClient}>
        <Flex  as={"main"} flexDirection="column" h="100vh" overflowY="scroll">
          <CalendarProvider>
            <DistributionProvider>
              <Component {...pageProps} />
            </DistributionProvider>
          </CalendarProvider>
          <FloatingNavButtons />
        </Flex>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      cookies: context.req.headers.cookie ?? "",
    },
  };
}
export default App;
