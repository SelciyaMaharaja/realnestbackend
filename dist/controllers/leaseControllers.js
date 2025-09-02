"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeasePayments = exports.getLeases = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getLeases = async (req, res) => {
    try {
        const leases = await prisma.lease.findMany({
            include: {
                tenant: true,
                property: true,
            },
        });
        res.json(leases);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving leases: ${error.message}` });
    }
};
exports.getLeases = getLeases;
const getLeasePayments = async (req, res) => {
    try {
        const { id } = req.params;
        const payments = await prisma.payment.findMany({
            where: { leaseId: Number(id) },
        });
        res.json(payments);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving lease payments: ${error.message}` });
    }
};
exports.getLeasePayments = getLeasePayments;
