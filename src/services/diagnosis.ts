import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

const getOne = async (code: string) => {
    const res = await axios.get<Diagnosis>(`${apiBaseUrl}/diagnoses/${code}`);
    return res.data;
};

const getAll = async () => {
    const res = await axios.get<Diagnosis[]>((`${apiBaseUrl}/diagnoses`));
    return res.data;
};

export default {
    getOne,
    getAll
};