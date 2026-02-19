import api from "./axios";
export const getTransactions = (start, end) => {
  if (start && end) {
  return api.get("/transactions/filter", {
    params: {
      start: start,
      end: end,
    },
  });
}

  return api.get("/transactions");
};

export const addTransaction = (data) => api.post("/transactions", data);

export const updateTransaction = (id, data) => api.put(`/transactions/${id}`, data);

export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);
