

export class User {
    uid: string;
    password: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;

    photoURL = "";
    displayName = "";
    platforms = [];

    constructor(id: string, email: string, verified: boolean, anonymous: boolean, providers) {
        this.uid = id;
        this.email = email;
        this.emailVerified = verified;
        this.isAnonymous = anonymous;

        if (providers) {
            var missing = 2;
            for (var i = 0; i < providers.length; i++) {

                this.platforms.push(providers[i].providerId);

                // extra data
                if (missing > 0) {
                    if (providers[i].displayName.length > 0 && this.displayName.length === 0) {
                        this.displayName = providers[i].displayName;
                        missing -= 1;
                    }

                    if (providers[i].photoURL.length > 0 && this.photoURL.length === 0) {
                        this.photoURL = providers[i].photoURL;
                        missing -= 1;
                    }
                }
            }
        } else {
            this.displayName = this.email;
        }
    }
}
