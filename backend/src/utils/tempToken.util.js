import crypto from "crypto";

export const generateTemporaryToken = () => {
    const unHashToken = crypto.randomBytes(20).toString("hex");

    const hashToken = crypto
        .createHash("sha256")
        .update(unHashToken)
        .digest("hex");
    
    const tokenExpiry = new Date(Date.now() + 20 * 60 * 1000);

    return { unHashToken, hashToken, tokenExpiry };
}