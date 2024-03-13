export const getContacts = async (ctx: any) => {
  ctx.commit("setContactList", {
    loading: true,
    data: [],
    error: null,
  });
  try {
    const { data } = await useIntegrate("/contacts", {
      method: "GET",
    });

    const contacts = data.value?.data;

    const payload = {
      loading: false,
      data: contacts,
      error: null,
    };

    ctx.commit("setContactList", payload);
  } catch (error) {
    ctx.commit("setContactList", {
      loading: false,
      data: [],
      error,
    });
  }
};

export const searchContacts = async (ctx: any, keyword: any) => {
ctx.commit("setContactList", {
  loading: true,
  data: [],
  error: null,
});
try {
  const { data } = await useIntegrate(`/contacts?search=${keyword}`, {
    method: "GET",
  });

  const contacts = data.value?.data;

  const payload = {
    loading: false,
    data: contacts,
    error: null,
  };

  ctx.commit("setContactList", payload);
} catch (error) {
  ctx.commit("setContactList", {
    loading: false,
    data: [],
    error,
  });
}
};


