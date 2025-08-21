 import 'express'; // Important for declaration merging to work correctly

    declare global {
        namespace Express {
            interface Request {
                user?: any; // Or a more specific type if you have one, e.g., 'User'
            }
        }
    }