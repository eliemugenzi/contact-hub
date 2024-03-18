import { isEmpty } from "lodash";
import store from "../store";
type IntegrationParams = {
  method: string;
  body?: Record<string, any>;
  params?: Record<string, string | number>;
};
export async function useIntegrate(URL: string, params: IntegrationParams) {
  const runtimeConfig = useRuntimeConfig();
  const { API_BASE_URL } = runtimeConfig.public;

  const URI = `${API_BASE_URL}${URL}`;

  let loading = true;

  const authToken = !isEmpty(store.getters.currentUser) ? `Bearer ${store.getters.currentUser?.access_token}` : undefined;

  const integrationResponse = await useFetch(URI, {
    method: params.method as any,
    body: params.body,
    headers: {
      authorization: authToken as string,
    },
  });

  console.log("RESPONSE___", integrationResponse);

  loading = false;

  return {
    ...integrationResponse,
    loading,
  };
}
