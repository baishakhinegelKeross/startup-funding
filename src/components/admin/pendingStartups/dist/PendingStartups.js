"use strict";
// PendingStartups.tsx
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var axios_1 = require("axios");
// Import shadcn Dialog components
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button"); // Assuming you have a Button component
var PendingStartups = function () {
    var _a = react_1.useState([]), campaigns = _a[0], setCampaigns = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(null), error = _c[0], setError = _c[1];
    var _d = react_1.useState(null), selectedCampaign = _d[0], setSelectedCampaign = _d[1];
    var _e = react_1.useState(false), isModalOpen = _e[0], setIsModalOpen = _e[1];
    // Fetch campaigns from the backend API
    react_1.useEffect(function () {
        var fetchCampaigns = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, pending, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, axios_1["default"].get('http://192.168.3.217:8090/api/fundraiser')];
                    case 1:
                        response = _a.sent();
                        pending = response.data.filter(function (campaign) { return !campaign.approved; });
                        setCampaigns(pending);
                        return [3 /*break*/, 4];
                    case 2:
                        err_1 = _a.sent();
                        setError(err_1.message || 'Failed to fetch campaigns.');
                        return [3 /*break*/, 4];
                    case 3:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchCampaigns();
    }, []);
    // Handle opening the modal with campaign details
    var handleViewDetails = function (campaign) {
        setSelectedCampaign(campaign);
        setIsModalOpen(true);
    };
    // Handle closing the modal
    var handleCloseModal = function () {
        setIsModalOpen(false);
        setSelectedCampaign(null);
    };
    // Handle Accept or Reject actions
    var handleAction = function (action) { return __awaiter(void 0, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedCampaign)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    // Update the campaign status in the backend
                    return [4 /*yield*/, axios_1["default"].patch("http://192.168.3.7:8080/api/fundraiser/" + selectedCampaign._id, {
                            approved: action === 'accept'
                        })];
                case 2:
                    // Update the campaign status in the backend
                    _a.sent();
                    // Update the local state
                    setCampaigns(function (prev) {
                        return prev.filter(function (campaign) { return campaign._id !== selectedCampaign._id; });
                    });
                    // Optionally, display a success message
                    alert("Campaign " + action + "ed successfully!");
                    return [3 /*break*/, 5];
                case 3:
                    err_2 = _a.sent();
                    alert("Failed to " + action + " the campaign: " + err_2.message);
                    return [3 /*break*/, 5];
                case 4:
                    handleCloseModal();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    if (loading) {
        return (react_1["default"].createElement("div", { className: "flex items-center justify-center h-screen" },
            react_1["default"].createElement("div", { className: "text-2xl text-gray-700" }, "Loading pending startups...")));
    }
    if (error) {
        return (react_1["default"].createElement("div", { className: "flex items-center justify-center h-screen" },
            react_1["default"].createElement("div", { className: "text-2xl text-red-500" },
                "Error: ",
                error)));
    }
    return (react_1["default"].createElement("div", { className: "p-6 bg-gray-50 min-h-screen" },
        react_1["default"].createElement("h2", { className: "text-4xl font-bold mb-6 text-center text-blue-600" }, "Pending Startups"),
        campaigns.length === 0 ? (react_1["default"].createElement("div", { className: "text-center text-gray-600" }, "No pending startups available.")) : (react_1["default"].createElement("div", { className: "overflow-x-auto" },
            react_1["default"].createElement("table", { className: "min-w-full bg-white shadow-md rounded-lg overflow-hidden" },
                react_1["default"].createElement("thead", { className: "bg-blue-500 text-white" },
                    react_1["default"].createElement("tr", null,
                        react_1["default"].createElement("th", { className: "px-6 py-3 text-left text-sm uppercase tracking-wider" }, "Campaign Title"),
                        react_1["default"].createElement("th", { className: "px-6 py-3 text-left text-sm uppercase tracking-wider" }, "Founder"),
                        react_1["default"].createElement("th", { className: "px-6 py-3 text-left text-sm uppercase tracking-wider" }, "Category"),
                        react_1["default"].createElement("th", { className: "px-6 py-3 text-left text-sm uppercase tracking-wider" }, "Target Amount"),
                        react_1["default"].createElement("th", { className: "px-6 py-3 text-left text-sm uppercase tracking-wider" }, "Status"),
                        react_1["default"].createElement("th", { className: "px-6 py-3 text-center text-sm uppercase tracking-wider" }, "Actions"))),
                react_1["default"].createElement("tbody", { className: "text-gray-700" }, campaigns.map(function (campaign) { return (react_1["default"].createElement("tr", { key: campaign._id, className: "border-b" },
                    react_1["default"].createElement("td", { className: "px-6 py-4" }, campaign.title),
                    react_1["default"].createElement("td", { className: "px-6 py-4" }, campaign.owner),
                    react_1["default"].createElement("td", { className: "px-6 py-4 capitalize" }, campaign.category),
                    react_1["default"].createElement("td", { className: "px-6 py-4" },
                        "$",
                        campaign.goal_amount.toLocaleString()),
                    react_1["default"].createElement("td", { className: "px-6 py-4" },
                        react_1["default"].createElement("span", { className: "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-200 text-yellow-800" }, "Pending")),
                    react_1["default"].createElement("td", { className: "px-6 py-4 text-center" },
                        react_1["default"].createElement(button_1.Button, { onClick: function () { return handleViewDetails(startup._id); }, className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200" }, "View Details")))); }))))),
        react_1["default"].createElement(dialog_1.Dialog, { open: isModalOpen, onOpenChange: setIsModalOpen },
            react_1["default"].createElement(dialog_1.DialogContent, { className: "bg-white rounded-lg max-w-4xl mx-auto p-6 shadow-lg" },
                react_1["default"].createElement(dialog_1.DialogHeader, null,
                    react_1["default"].createElement(dialog_1.DialogTitle, { className: "text-3xl font-bold mb-4 text-blue-600 text-center" }, selectedCampaign === null || selectedCampaign === void 0 ? void 0 : selectedCampaign.title),
                    react_1["default"].createElement(dialog_1.DialogDescription, null)),
                selectedCampaign && (react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("img", { src: selectedCampaign.image_url, alt: selectedCampaign.title, className: "w-full h-64 object-cover rounded-lg shadow-md" })),
                        react_1["default"].createElement("div", { className: "space-y-4" },
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("h4", { className: "text-xl font-semibold text-gray-700" }, "Description:"),
                                react_1["default"].createElement("p", { className: "text-gray-600" }, selectedCampaign.story)),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("h4", { className: "text-xl font-semibold text-gray-700" }, "Category:"),
                                react_1["default"].createElement("p", { className: "text-gray-600 capitalize" }, selectedCampaign.category)),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("h4", { className: "text-xl font-semibold text-gray-700" }, "Founder:"),
                                react_1["default"].createElement("p", { className: "text-gray-600" }, selectedCampaign.owner)),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("h4", { className: "text-xl font-semibold text-gray-700" }, "Email:"),
                                react_1["default"].createElement("p", { className: "text-gray-600" }, selectedCampaign.email)),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("h4", { className: "text-xl font-semibold text-gray-700" }, "Target Amount:"),
                                react_1["default"].createElement("p", { className: "text-gray-600" },
                                    "$",
                                    selectedCampaign.goal_amount.toLocaleString())),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("h4", { className: "text-xl font-semibold text-gray-700" }, "Current Amount:"),
                                react_1["default"].createElement("p", { className: "text-gray-600" },
                                    "$",
                                    selectedCampaign.current_amount.toLocaleString())),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("h4", { className: "text-xl font-semibold text-gray-700" }, "Amount Raised:"),
                                react_1["default"].createElement("p", { className: "text-gray-600" },
                                    "$",
                                    selectedCampaign.amount_raised.toLocaleString())),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("h4", { className: "text-xl font-semibold text-gray-700" }, "End Date:"),
                                react_1["default"].createElement("p", { className: "text-gray-600" }, selectedCampaign.end_date
                                    ? new Date(selectedCampaign.end_date).toLocaleDateString()
                                    : 'N/A')))),
                    react_1["default"].createElement("div", { className: "mt-6" },
                        react_1["default"].createElement("h3", { className: "text-2xl font-semibold text-gray-700 mb-4" }, "Contributions:"),
                        selectedCampaign.contributions.length === 0 ? (react_1["default"].createElement("p", { className: "text-gray-600" }, "No contributions yet.")) : (react_1["default"].createElement("ul", { className: "space-y-2" }, selectedCampaign.contributions.map(function (contribution) { return (react_1["default"].createElement("li", { key: contribution._id, className: "border p-4 rounded-lg" },
                            react_1["default"].createElement("div", { className: "flex justify-between" },
                                react_1["default"].createElement("span", { className: "font-semibold text-gray-700" },
                                    "$",
                                    contribution.amount.toLocaleString()),
                                react_1["default"].createElement("span", { className: "text-gray-500" }, new Date(contribution.date).toLocaleDateString())),
                            react_1["default"].createElement("p", { className: "text-gray-600 mt-2" },
                                "Donor ID: ",
                                contribution.fundraiserId))); })))),
                    react_1["default"].createElement(dialog_1.DialogFooter, { className: "mt-8 flex justify-center space-x-4" },
                        react_1["default"].createElement(button_1.Button, { onClick: function () { return handleAction('accept'); }, className: "px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-200" }, "Accept"),
                        react_1["default"].createElement(button_1.Button, { onClick: function () { return handleAction('reject'); }, className: "px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-200" }, "Reject"))))))));
};
exports["default"] = PendingStartups;
