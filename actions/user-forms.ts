"use server";

import {
    changePassword,
    ChangePasswordInput,
    InterviewFormPayload,
    personalDetialsUpdate,
    PrePostTaxPayload,
    submitInterviewSheet,
    submitPostTaxDocs,
    submitPreTaxDocs,
    updatePersonalDetails,
    uplaodDocument,
} from "@/core/user";
import { getSession } from "@/lib/session";

export async function personalInfoUpdateAction(body: personalDetialsUpdate) {
    const session = await getSession();
    if (!session) return { success: false, message: "Unauthorized" };

    try {
        await updatePersonalDetails(session.id, body);
        return { success: true };
    } catch (err) {
        return {
            success: false,
            message: err instanceof Error
                ? err.message
                : "Something went wrong",
        };
    }
}

export async function settingFormAction(body: Omit<ChangePasswordInput, "id">) {
    const session = await getSession();
    if (!session) return { success: false, message: "Unauthorized" };
    try {
        await changePassword({ ...body, id: session.id });
        return { success: true };
    } catch (err) {
        return {
            success: false,
            message: err instanceof Error
                ? err.message
                : "Something went wrong",
        };
    }
}

export async function preTaxFormAction(
    body: Omit<PrePostTaxPayload, "userId">,
) {
    const session = await getSession();
    if (!session) return { success: false, message: "Unauthorized" };
    try {
        await submitPreTaxDocs({ ...body, userId: session.id });
        return { success: true };
    } catch (err) {
        return {
            success: false,
            message: err instanceof Error
                ? err.message
                : "Something went wrong",
        };
    }
}

export async function postTaxFormAction(
    body: Omit<PrePostTaxPayload, "userId">,
) {
    const session = await getSession();
    if (!session) return { success: false, message: "Unauthorized" };
    try {
        await submitPostTaxDocs({ ...body, userId: session.id });
        return { success: true };
    } catch (err) {
        return {
            success: false,
            message: err instanceof Error
                ? err.message
                : "Something went wrong",
        };
    }
}

export async function interviewSheetSubmitAction(
    payload: Omit<InterviewFormPayload, "id">,
) {
    console.log(payload);

    const session = await getSession();
    if (!session) return { success: false, message: "Unauthorized" };
    try {
        await submitInterviewSheet({ ...payload, id: session.id });
        return { success: true };
    } catch (err) {
        return {
            success: false,
            message: err instanceof Error
                ? err.message
                : "Something went wrong",
        };
    }
}

export async function uploadDocumentAction(doc: string) {
    try {
        const session = await getSession();
        if (!session) return { success: false, message: "Unauthorized" };
        const fileId = await uplaodDocument(doc);
        return {
            success: true,
            fileId,
        };
    } catch (err) {
        return {
            success: false,
            message: err instanceof Error
                ? err.message
                : "Something went wrong",
        };
    }
}
