/** @format */

const KJUR = require("jsrsasign");

function generateSignature(
	sdkKey,
	sdkSecret,
	sessionName,
	role,
	sessionKey,
	userIdentity
) {
	const iat = Math.round(new Date().getTime() / 1000) - 30;
	const exp = iat + 60 * 60 * 2;
	const oHeader = { alg: "HS256", typ: "JWT" };

	const oPayload = {
		app_key: sdkKey,
		tpc: sessionName,
		role_type: role,
		session_key: sessionKey,
		user_identity: userIdentity,
		version: 1,
		iat: iat,
		exp: exp,
	};

	const sHeader = JSON.stringify(oHeader);
	const sPayload = JSON.stringify(oPayload);
	const sdkJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, sdkSecret);
	return sdkJWT;
}

module.exports = {
	generateSignature,
};
