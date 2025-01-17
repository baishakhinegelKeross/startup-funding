"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var campaignCard_1 = require("@/components/CampaignCard/campaignCard");
var DonationModal_1 = require("./DonationModal"); // Import the DonationModal
var CreateCampaignModal_1 = require("./CreateCampaignModal");
var button_1 = require("@/components/ui/button");
// You can define an interface for type safety if desired
// interface Campaign {
//   _id: string;
//   image?: string;
//   title: string;
//   status: string;
//   progress: number;
//   fundsRaised: number;
//   targetAmount: number;
//   investors: number;
//   daysRemaining: number;
// }
var MyCampaignPage = function () {
    var _a = react_1.useState([]), campaigns = _a[0], setCampaigns = _a[1];
    var _b = react_1.useState([]), campaignData = _b[0], setCampaignData = _b[1];
    var _c = react_1.useState(true), loading = _c[0], setLoading = _c[1];
    var _d = react_1.useState(false), isDonationModalOpen = _d[0], setIsDonationModalOpen = _d[1];
    var _e = react_1.useState(null), error = _e[0], setError = _e[1];
    var _f = react_1.useState(null), selectedCampaignId = _f[0], setSelectedCampaignId = _f[1];
    var _g = react_1.useState(false), isModalOpen = _g[0], setIsModalOpen = _g[1];
    var handleDonate = function (campaignId) {
        setSelectedCampaignId(campaignId);
        setIsDonationModalOpen(true);
    };
    // Fetch campaign data when the component mounts
    react_1.useEffect(function () {
        var fetchCampaigns = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, fetch('http://192.168.3.217:8090/api/fundraiser')];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _a.sent();
                        setCampaignData(result);
                        console.log(result);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        setError(error_1.message);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchCampaigns();
    }, [campaigns]);
    var handleCreateCampaign = function (campaignData) { return __awaiter(void 0, void 0, void 0, function () {
        var newCampaign, response, errorData, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newCampaign = __assign(__assign({}, campaignData), { amount_raised: 0, createdAt: new Date() });
                    console.log('Creating campaign:', newCampaign);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch('http://192.168.3.7:8080/api/fundraiser', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(newCampaign)
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.text()];
                case 3:
                    errorData = _a.sent();
                    throw new Error("Network response was not ok: " + errorData);
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    result = _a.sent();
                    console.log('Campaign created successfully:', result);
                    setCampaigns(__spreadArrays(campaigns, [result]));
                    return [3 /*break*/, 7];
                case 6:
                    error_2 = _a.sent();
                    console.error('Error creating campaign:', error_2);
                    setError(error_2.message);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var handleCompleteDonation = function (amount, donorName, message) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('Processing donation:', { amount: amount, donorName: donorName, message: message });
            // try {
            //   const response = await fetch('http://192.168.3.7:8080/api/fundraiser/campaign/contribution', {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //       fundraiserId: selectedCampaignId,
            //       amount,
            //       donorName,
            //       message
            //     })
            //   });
            //   if (!response.ok) {
            //     throw new Error('Network response was not ok');
            //   }
            //   const result = await response.json();
            //   console.log('Donation successful:', result);
            // } catch (error) {
            //   console.error('Error processing donation:', error);
            //   setError(error.message);
            // }
            setSelectedCampaignId(null);
            return [2 /*return*/];
        });
    }); };
    if (loading) {
        return (react_1["default"].createElement("div", { className: "p-10 pt-20" },
            react_1["default"].createElement("h2", { className: "text-xl md:text-4xl" }, "Loading campaigns...")));
    }
    if (error) {
        return (react_1["default"].createElement("div", { className: "p-10 pt-20" },
            react_1["default"].createElement("h2", { className: "text-xl md:text-4xl text-red-500" },
                "Error fetching campaigns: ",
                error)));
    }
    return (react_1["default"].createElement("div", { className: "p-10 pt-20" },
        react_1["default"].createElement("div", { className: 'flex justify-center gap-10 ' },
            react_1["default"].createElement("h2", { className: "text-xl md:text-4xl" }, "My Campaigns"),
            react_1["default"].createElement(button_1.Button, { variant: "profilebtn", onClick: function () { return setIsModalOpen(true); }, className: "cta  text-white py-2 px-4 rounded" }, "Start a Campaign")),
        react_1["default"].createElement("div", { className: "mt-10 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-7" }, campaignData.map(function (campaign) { return (react_1["default"].createElement(campaignCard_1["default"], { key: campaign._id, campaign: campaign, onDonate: handleDonate })); })),
        isModalOpen && (react_1["default"].createElement(CreateCampaignModal_1.CreateCampaignModal, { onClose: function () { return setIsModalOpen(false); }, onCreateCampaign: handleCreateCampaign })),
        isDonationModalOpen && (react_1["default"].createElement(DonationModal_1["default"], { campaignId: selectedCampaignId, onClose: function () { return setIsDonationModalOpen(false); }, onDonate: handleCompleteDonation }))));
};
exports["default"] = MyCampaignPage;
