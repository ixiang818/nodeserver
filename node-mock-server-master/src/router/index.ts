import * as Router from 'koa-router';
import createRoutes from '../utils/create-routes';
import { randomString } from '../utils/random'
// 引入生成路由的json数据
const routes = require('../../data/routes.json');
const mysql = require("mysql");

const router = new Router({
    prefix: routes.baseRoute ? `/${routes.baseRoute}` : '',
});
const db_config = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "diarydb"
}
const connect = mysql.createConnection(db_config);
//开始链接数据库
connect.connect(function (err: any) {
    if (err) {
        console.log(`mysql连接失败: ${err}!`);
    } else {
        console.log("mysql连接成功!");
    }
});

//假数据库
const dialyEvents = [{
    date: new Date("2021-03-22 13:00:00").getTime(),
    wether: "Sun",
    mood: "happy",
    text: "today is a good day",
    hours: 12,
    minutes: 30,
}, {
    date: new Date("2021-03-20 13:00:00").getTime(),
    wether: "Rain",
    mood: "sad",
    text: "today is not a good day",
    hours: 11,
    minutes: 10,
}, {
    date: new Date("2021-03-19 13:00:00").getTime(),
    wether: "Cloud",
    mood: "upset",
    text: "Interim reply",
    hours: 8,
    minutes: 30,
}, {
    date: new Date("2020-10-10 13:00:00").getTime(),
    wether: "Cloud",
    mood: "upset",
    text: "Interim reply eric",
    hours: 8,
    minutes: 30,
}]


router.get('/', async (ctx) => {
    const str: string = 'Hello Typescript';
    ctx.body = str;
});

//登录
router.post('/login', async (ctx) => {
    
    //@ts-ignore
    console.log(ctx.request.body);
    //@ts-ignore
    var username = ctx.request.body.username;
    //@ts-ignore
    var password = ctx.request.body.password;
    var isSearch;

    let sqlQuery = "select * from users where username='"+username+"'";
    connect.query(sqlQuery, function (err: any, result: any) {
        if (err) {
            console.log(`SQL error: ${err}!`);
        } else {
            console.log(result[0].password);
            if(result[0].password == password){
                isSearch = true;
            }else{
                isSearch = false;
            }
        }
    });

    var response: { data: { userToken: string }; success: boolean;};
    console.log(isSearch)
    if(isSearch){
        response = {
            success: true,
            data: {
                userToken: randomString(),
            },
        };
    }else{
        response = {
            success: false,
            data: {
                userToken: '',
            },
        };
    }
    ctx.body = response;
});

//获取日记
router.get('/getevents', async (ctx) => {
    let response: { data: Array<{ date: number; wether: string; mood: string; text: string; hours: number; minutes: number; }>; success: boolean; errorMessage: null; errorCode: null };
    response = {
        success: true,
        errorCode: null,
        errorMessage: null,
        data: dialyEvents,
    };
    ctx.body = response;
});

//新增文字
router.post('/createWord', async (ctx) => {
    //@ts-ignore
    console.log(ctx.request.body)
    let response: { success: boolean; errorMessage: null; errorCode: null };
    response = {
        success: true,
        errorCode: null,
        errorMessage: null,
    };
    ctx.body = response;
});

//删除日记
router.post('/deleteWord', async (ctx) => {
    dialyEvents.splice(2, 1)
    //@ts-ignore
    console.log(ctx.request.body)
    let response: { success: boolean; errorMessage: null; errorCode: null };
    response = {
        success: true,
        errorCode: null,
        errorMessage: null,
    };
    ctx.body = response;
});

//查找日记
router.post('/search', async (ctx) => {
    //@ts-ignore
    console.log(ctx.request.body)
    let response: { data: Array<{ date: number; wether: string; mood: string; text: string; hours: number; minutes: number; }>; success: boolean; errorMessage: null; errorCode: null };
    response = {
        success: true,
        errorCode: null,
        errorMessage: null,
        data: [{
            date: new Date("2021-03-19 13:00:00").getTime(),
            wether: "Cloud",
            mood: "upset",
            text: "Interim reply",
            hours: 8,
            minutes: 30,
        },]
    };
    ctx.body = response;
});










// SR
router.get('/osp/api/sr/outstanding', async (ctx) => {
    let response: { data: { totalPages: number; content: Array<{ severity: number; subCategory: string; srNumber: string; lastModifiedByDisplayName: string; lastModifiedTime: number; subject: string; lastModifiedBy: string; mainCategory: string; category: string; status: string } | { severity: number; subCategory: string; srNumber: string; lastModifiedByDisplayName: string; lastModifiedTime: number; subject: string; lastModifiedBy: string; mainCategory: string; category: string; status: string }>; totalElements: number }; success: boolean; errorMessage: null; errorCode: null };
    response = {
        success: true,
        errorCode: null,
        errorMessage: null,
        data: {
            content: [
                {
                    srNumber: 'PTS-00275686',
                    severity: 1,
                    mainCategory: 'GDSC',
                    category: 'Non Enterprise Application Issues',
                    subCategory: 'Helpdesk Support Portal - GDSC',
                    subject: 'TT conversation history screws up',
                    status: 'Investigation in Progress',
                    lastModifiedBy: 'OOCLDM\\CHENSA7',
                    lastModifiedByDisplayName: 'SALLY L L CHEN (EUCD-EUC-ISD-OOCLL/ZHA)',
                    lastModifiedTime: 1568509851331,
                },
                {
                    srNumber: 'PTS-00275457',
                    severity: 2,
                    mainCategory: 'GDSC',
                    category: 'Non Enterprise Application Issues',
                    subCategory: 'Helpdesk Support Portal - GDSC',
                    subject: 'TT conversation history screws up',
                    status: 'Investigation in Progress',
                    lastModifiedBy: 'OOCLDM\\CHENSA7',
                    lastModifiedByDisplayName: 'SALLY L L CHEN (EUCD-EUC-ISD-OOCLL/ZHA)',
                    lastModifiedTime: 1568009851331,
                },
                {
                    srNumber: 'PTS-00614454',
                    severity: 3,
                    mainCategory: 'GDSC',
                    category: 'Non Enterprise Application Issues',
                    subCategory: 'Helpdesk Support Portal - GDSC',
                    subject: 'TT conversation history screws up',
                    status: 'Investigation in Progress',
                    lastModifiedBy: 'OOCLDM\\CHENSA7',
                    lastModifiedByDisplayName: 'SALLY L L CHEN (EUCD-EUC-ISD-OOCLL/ZHA)',
                    lastModifiedTime: 1568009851331,
                },
            ],
            totalElements: 3,
            totalPages: 1,
        },
    };
    ctx.body = response;
});

router.get('/osp/api/sr/previous', async (ctx) => {
    let response: { data: { totalPages: number; content: Array<{ severity: number; subCategory: string; srNumber: string; lastModifiedByDisplayName: string; lastModifiedTime: number; subject: string; lastModifiedBy: string; mainCategory: string; category: string; status: string } | { severity: number; subCategory: string; srNumber: string; lastModifiedByDisplayName: string; lastModifiedTime: number; subject: string; lastModifiedBy: string; mainCategory: string; category: string; status: string }>; totalElements: number }; success: boolean; errorMessage: null; errorCode: null };
    response = {
        success: true,
        errorCode: null,
        errorMessage: null,
        data: {
            content: [{
                srNumber: 'ESR-00275686',
                severity: 1,
                mainCategory: 'IRIS-4 Firefox Browser',
                category: 'Non Enterprise Application Issues',
                subCategory: 'Helpdesk Support Portal - GDSC',
                subject: 'TT conversation history screws up',
                status: 'Investigation in Progress',
                lastModifiedBy: 'OOCLDM\\CHENSA7',
                lastModifiedByDisplayName: 'SALLY L L CHEN (EUCD-EUC-ISD-OOCLL/ZHA)',
                lastModifiedTime: 1568009851331,
            },
            {
                srNumber: 'ESR-00275457',
                severity: 2,
                mainCategory: 'Virus & Cybersecurity',
                category: 'Non Enterprise Application Issues',
                subCategory: 'Helpdesk Support Portal - GDSC',
                subject: 'TT conversation history screws up',
                status: 'Investigation in Progress',
                lastModifiedBy: 'OOCLDM\\CHENSA7',
                lastModifiedByDisplayName: 'SALLY L L CHEN (EUCD-EUC-ISD-OOCLL/ZHA)',
                lastModifiedTime: 1568009851331,
            },
            {
                srNumber: 'PTS-00614454',
                severity: 3,
                mainCategory: 'Cosco-Domestic',
                category: 'Non Enterprise Application Issues',
                subCategory: 'Helpdesk Support Portal - GDSC',
                subject: 'TT conversation history screws up',
                status: 'Investigation in Progress',
                lastModifiedBy: 'OOCLDM\\CHENSA7',
                lastModifiedByDisplayName: 'SALLY L L CHEN (EUCD-EUC-ISD-OOCLL/ZHA)',
                lastModifiedTime: 1568009851331,
            }],
            totalElements: 3,
            totalPages: 1,
        },
    };
    ctx.body = response;
});

router.get('/osp/api/sr/detail/:srNumber', async (ctx) => {
    console.log(ctx.params);
    console.log(ctx.query);
    let response: {
        data: {
            content: {
                srInformation: { severity: string; requesterType: string; srNumber: string; attachments: Array<{ fileName: string; contentType: string; url: string } | { fileName: string; contentType: string; url: string }>; subject: string; descriptionViewLink: string; requesterBy: string; rootCauseProvided: number; description: string; mainCategoryCode: string; resolutionViewLink: string; resolution: string; adminFormLink: null; mainCategoryDescription: string; carrier: string; srType: string; affectedDevice: string; impactRange: null; rootCause: string; notificationRecipients: string; category: string; subcategory: string; status: string }; srMessages: Array<{ messageViewLink: string; attachments: Array<{ fileName: string; contentType: string; url: string }>; createdBy: string; createdTime: number; messageId: number; message: string; megType: string; createdByDisplayName: string }>; srRequesterInformation: { countryOrRegion: string; city: string; displayName: string; contactBy: string; company: string; office: string; department: string; userId: string; telNo: string; email: string; territory: string }; srSupportInformation: { srOwner: string; firstAssigned: number; actualResolvedBy: string; lastResponse: number; assignedTo: string; resolved: number }; srHistoryLog: Array<{ createdTime: number; type: string; value: string } | { createdTime: number; type: string; value: string } | { createdTime: number; type: string; value: string } | { createdTime: number; type: string; value: string } | { createdTime: number; type: string; value: string } | { createdTime: number; type: string; value: string } | { createdTime: number; type: string; value: string } | { createdTime: number; type: string; value: string }>
            },
        }; success: boolean; errorMessage: null; errorCode: null
    };
    response = {
        success: true,
        errorCode: null,
        errorMessage: null,
        data: {
            content: {
                srInformation: {
                    srNumber: 'ESR-00278028',
                    carrier: 'OOCL,COSCO',
                    affectedDevice: 'ZHAPROJB16-W10',
                    requesterType: 'Intermal User',
                    srType: 'Application',
                    mainCategoryCode: 'IRIS-4',
                    mainCategoryDescription: 'IRIS-4',
                    category: 'COSCO IRIS-4',
                    subcategory: 'BKG (Booking)',
                    severity: "3 - User's normal Problem",
                    status: 'Provided solution, TBC by user',
                    subject: 'TT conversation history screws up',
                    description: 'This morning we find that we cannot select category in GDSC portal when we transfer a ticket from EASC portal to GDSC portal. Could you check?',
                    descriptionViewLink: 'http://chensa7-w10.corp.oocl.com:7001/osp/richTextView?srNumber=ESR-00278028&type=description',
                    adminFormLink: null,
                    attachments: [
                        {
                            fileName: 'Screen Cap1.jpg',
                            contentType: 'images/jpg',
                            url: 'http://hk3cvdv00673.oocl.com:6003/ospdev/ESR-00278028/1',
                        },
                        {
                            fileName: 'Screen Cap1.jpg',
                            contentType: 'images/jpg',
                            url: 'http://hk3cvdv00673.oocl.com:6003/ospdev/ESR-00278028/2',
                        },
                    ],
                    rootCause: 'System Problem',
                    rootCauseProvided: 1568009851331,
                    resolution: 'Provided permission setting to user',
                    resolutionViewLink: 'http://chensa7-w10.corp.oocl.com:7001/osp/richTextView?srNumber=ESR-00278028&type=resolution',
                    notificationRecipients: 'CHENSA7@oocl.com；tim.wang@oocl.com',
                    requesterBy: 'OOCLDM\\CHENSA7',
                    impactRange: null,
                },
                srMessages: [
                    {
                        createdBy: 'OOCLDM\\CHENSA7',
                        createdByDisplayName: 'SALLY L L CHEN (EUCD-EUC-ISD-OOCLL/ZHA)',
                        createdTime: 1568208851331,
                        messageId: 3,
                        message: 'Local confirm it is NOT attack but using FTP service to upload files.',
                        megType: 'PR',
                        messageViewLink: 'http://chensa7-w10.corp.oocl.com:7001/osp/richTextView?srNumber=ESR-00278028&type=message',
                        attachments: [
                            {
                                fileName: 'Screen Cap 1.jpg',
                                contentType: 'images/jpg',
                                url: 'http://hk3cvdv00673.oocl.com:6003/ospdev/ESR-00278028/1/3',
                            },
                            {
                                fileName: 'Screen Cap 2.jpg',
                                contentType: 'images/jpg',
                                url: 'http://hk3cvdv00673.oocl.com:6003/ospdev/ESR-00278028/1/3',
                            },
                        ],
                    },
                    {
                        createdBy: 'OOCLDM\\CHENSA7',
                        createdByDisplayName: 'SALLY L L CHEN (EUCD-EUC-ISD-OOCLL/ZHA)',
                        createdTime: 1568009851331,
                        messageId: 2,
                        message: 'Local confirm it is NOT attack but using FTP service to upload files.',
                        megType: 'PR',
                        messageViewLink: 'http://chensa7-w10.corp.oocl.com:7001/osp/richTextView?srNumber=ESR-00278028&type=message',
                        attachments: [
                            {
                                fileName: 'abc.txt',
                                contentType: 'txt',
                                url: 'http://hk3cvdv00673.oocl.com:6003/ospdev/ESR-00278028/1/3',
                            },
                        ],
                    },
                    {
                        createdBy: 'OOCLDM\\CHENSA7',
                        createdByDisplayName: 'SALLY L L CHEN (EUCD-EUC-ISD-OOCLL/ZHA)',
                        createdTime: 1567098851331,
                        messageId: 1,
                        message: 'Local confirm it is NOT attack but using FTP service to upload files.',
                        megType: 'PR',
                        messageViewLink: 'http://chensa7-w10.corp.oocl.com:7001/osp/richTextView?srNumber=ESR-00278028&type=message',
                        attachments: [
                            {
                                fileName: 'abc.txt',
                                contentType: 'txt',
                                url: 'http://hk3cvdv00673.oocl.com:6003/ospdev/ESR-00278028/1/3',
                            },
                        ],
                    },
                ],
                srRequesterInformation: {
                    displayName: 'SALLY L L CHEN (EUCD-EUC-ISD-OOCLL/ZHA)',
                    userId: 'OOCLDM\\CHENSA7',
                    territory: 'APT',
                    countryOrRegion: 'CHINA-SOUTH',
                    city: 'ZHUHAI',
                    company: 'CARGOSMART',
                    office: 'ZHA',
                    department: 'VBC',
                    telNo: '86-756-3673100',
                    email: 'chensa7@oocl.com',
                    contactBy: 'Web Portal',
                },
                srSupportInformation: {
                    srOwner: 'SALLY L L CHEN (EUCD-EUC-ISD-OOCLL/ZHA)',
                    assignedTo: 'NOLI BUENAVENTURA (EASC=ISD-OOCLLL/MNL)',
                    actualResolvedBy: 'NOLI BUENAVENTURA (EASC=ISD-OOCLLL/MNL)',
                    firstAssigned: 1567709851331,
                    resolved: 1567909851331,
                    lastResponse: 1568009851331,
                },
                srHistoryLog: [
                    {
                        createdTime: 1568009851331,
                        value: '3 - Ordinary Impact',
                        type: 'severity',
                    },
                    {
                        createdTime: 1568109851000,
                        value: '2 - Major Impact',
                        type: 'severity',
                    },
                    {
                        createdTime: 1568209851000,
                        value: '1 - Major and Serious Impact',
                        type: 'severity',
                    },
                    {
                        createdTime: 1568009851331,
                        value: 'Pending for User Response',
                        type: 'status',
                    },
                    {
                        createdTime: 1568009851000,
                        value: 'UnAssigned',
                        type: 'status',
                    },
                    {
                        createdTime: 1568009851331,
                        value: 'SALLY L L CHEN (EUCD-EUC-ISD-OOCLL/ZHA)',
                        type: 'srOwner',
                    },
                    {
                        createdTime: 1568009851000,
                        value: 'MARQUIS HU (EUCD-EUC-ISD-OOCLL/ZHA)',
                        type: 'srOwner',
                    },
                    {
                        createdTime: 1568009851331,
                        value: 'SALLY L L CHEN (EUCD-EUC-ISD-OOCLL/ZHA)',
                        type: 'assignedTo',
                    },
                    {
                        createdTime: 1568009851000,
                        value: 'MARQUIS HU (EUCD-EUC-ISD-OOCLL/ZHA)',
                        type: 'assignedTo',
                    },
                ],
            },
        },
    };
    ctx.body = response;
});

router.get('/osp/api/sr/mainCategory', async (ctx) => {
    let response: { data: { mainCategory: Array<{ code: string; description: string } | { code: string; description: string }> }; success: boolean; errorMessage: null; errorCode: null };
    response = {
        success: true,
        errorCode: null,
        errorMessage: null,
        data: {
            mainCategory: [
                { code: 'IRIS-4', description: 'IRIS-4' },
                { code: 'Security', description: 'Security' },
            ],
        },
    };
    ctx.body = response;
});

router.get('/osp/api/sr/messages', async (ctx) => {
    let response: { data: { content: Array<{ messageViewLink: string; msgType: string; attachments: Array<{ fileName: string; contentType: string; url: string }>; createdBy: string; createdTime: number; messageId: number; message: string; createdByDisplayName: string }> }; success: boolean; errorMessage: null; errorCode: null };
    response = {
        success: true,
        errorCode: null,
        errorMessage: null,
        data: {
            content: [
                {
                    createdBy: 'OOCLDM\\CHENSA7',
                    createdByDisplayName: 'SALLY L L CHEN (EUCD-EUC-ISD-OOCLL/ZHA)',
                    createdTime: 1568009851331,
                    messageId: 1,
                    message: 'Local confirm it is NOT attack but using FTP service to upload files.',
                    msgType: 'PR',
                    messageViewLink: 'http://chensa7-w10.corp.oocl.com:7001/osp/richTextView?srNumber=ESR-00278028&type=message',
                    attachments: [
                        {
                            fileName: 'abc.txt',
                            contentType: 'txt',
                            url: 'http://hk3cvdv00673.oocl.com:6003/ospdev/PTS-00673139/1/3',
                        },
                    ],
                },
            ],
        },
    };
    ctx.body = response;
});

router.post('/osp/api/sr', async (ctx) => {
    let response: { data: { srNumber: string }; success: boolean; errorMessage: null; errorCode: null };
    response = {
        success: true,
        errorCode: null,
        errorMessage: null,
        data: {
            srNumber: 'ESR-00278760',
        },
    };
    ctx.body = response;
});

router.post('/osp/api/sr/message', async (ctx) => {
    let response: { data: { srNumber: string }; success: boolean; errorMessage: null; errorCode: null };
    response = {
        success: true,
        errorCode: null,
        errorMessage: null,
        data: {
            srNumber: 'ESR-00278760',
        },
    };
    ctx.body = response;
});

// Notification
router.patch('/osp/api/notifications/:srNumber/', async (ctx) => {
    let response: { success: boolean; isRead: string; errorMessage: null; errorCode: null };
    response = {
        isRead: 'false',
        success: true,
        errorCode: null,
        errorMessage: null,
    };
    ctx.body = response;
});

router.get('/osp/api/notifications/:srNumber', async (ctx) => {
    let response: { data: Array<{ isRead: string; createdTime: number; message: string } | { isRead: string; createdTime: number; message: string } | { isRead: string; createdTime: number; message: string }>; success: boolean; errorMessage: null; errorCode: null };
    response = {
        success: true,
        errorCode: null,
        errorMessage: null,
        data: [{
            createdTime: 1568009851331,
            message: 'PTS-00614454 is updated',
            isRead: 'false',
        }, {
            createdTime: 1568009851331,
            message: 'PTS-00614454 is updated',
            isRead: 'false',
        }, {
            createdTime: 1568009851331,
            message: 'PTS-00614454 is updated',
            isRead: 'false',
        }],
    };
    ctx.body = response;
});

router.get('/osp/api/notifications', async (ctx) => {
    let response: { data: Array<{ srNumber: string; notifications: Array<{ isRead: string; createdTime: number; id: string; message: string } | { isRead: string; createdTime: number; id: string; message: string } | { isRead: string; createdTime: number; id: string; message: string }> } | { srNumber: string; notifications: Array<{ isRead: string; createdTime: number; id: string; message: string } | { isRead: string; createdTime: number; id: string; message: string } | { isRead: string; createdTime: number; id: string; message: string }> } | { srNumber: string; notifications: Array<{ isRead: string; createdTime: number; id: string; message: string } | { isRead: string; createdTime: number; id: string; message: string } | { isRead: string; createdTime: number; id: string; message: string }> }>; success: boolean; errorMessage: null; errorCode: null };
    response = {
        success: true,
        errorCode: null,
        errorMessage: null,
        data: [{
            srNumber: 'PTS-00614454',
            notifications: [{
                id: '1234567894',
                createdTime: 1568009851331,
                message: 'PTS-00614454 is updated',
                isRead: 'false',
            }, {
                id: '1234567894',
                createdTime: 1568009851331,
                message: 'PTS-00614454 status is changed',
                isRead: 'false',
            }, {
                id: '1234567894',
                createdTime: 1568009851331,
                message: 'PTS-00614454 is updated',
                isRead: 'false',
            }],
        }, {
            srNumber: 'PTS-006155472',
            notifications: [{
                id: '1234567894',
                createdTime: 1568009851331,
                message: 'PTS-006155472 is updated',
                isRead: 'false',
            }, {
                id: '1234567894',
                createdTime: 1568009851331,
                message: 'PTS-006155472 status is changed',
                isRead: 'false',
            }, {
                id: '1234567894',
                createdTime: 1568009851331,
                message: 'PTS-006155472 is updated',
                isRead: 'true',
            }],
        }, {
            srNumber: 'PTS-00614321',
            notifications: [{
                id: '1234567894',
                createdTime: 1568009851331,
                message: 'PTS-00614321 is updated',
                isRead: 'true',
            }, {
                id: '1234567894',
                createdTime: 1568009851331,
                message: 'PTS-00614321 status is changed',
                isRead: 'true',
            }, {
                id: '1234567894',
                createdTime: 1568009851331,
                message: 'PTS-00614321 is updated',
                isRead: 'true',
            }],
        }],
    };
    ctx.body = response;
});

// Announcements
router.get('/osp/api/announcements', async (ctx) => {
    let response: { data: { totalPages: number; content: Array<{ affectedService: string; createdTime: number; id: string; title: string; status: string } | { affectedService: string; createdTime: number; id: string; title: string; status: string } | { affectedService: string; createdTime: number; id: string; title: string; status: string } | { affectedService: string; createdTime: number; id: string; title: string; status: string } | { affectedService: string; createdTime: number; id: string; title: string; status: string } | { affectedService: string; createdTime: number; id: string; title: string; status: string } | { affectedService: string; createdTime: number; id: string; title: string; status: string }>; totalElements: number }; success: boolean; errorMessage: null; errorCode: null };
    response = {
        data: {
            content: [{
                id: '123456',
                affectedService: 'GDSC',
                createdTime: 1568009851331,
                title: 'IOCM-New Zealand...',
                status: 'active',
            }, {
                id: '123456',
                affectedService: 'GDSC',
                createdTime: 1568009851331,
                title: 'IOCM-New Zealand...',
                status: 'active',
            }, {
                id: '123456',
                affectedService: 'GDSC',
                createdTime: 1568009851331,
                title: 'IOCM-New Zealand...',
                status: 'active',
            }, {
                id: '123456',
                affectedService: 'GDSC',
                createdTime: 1568009851331,
                title: 'IOCM-New Zealand...',
                status: 'scheduled',
            }, {
                id: '123456',
                affectedService: 'GDSC',
                createdTime: 1568009851331,
                title: 'IOCM-New Zealand...',
                status: 'scheduled',
            }, {
                id: '123456',
                affectedService: 'GDSC',
                createdTime: 1568009851331,
                title: 'IOCM-New Zealand...',
                status: 'completed',
            }, {
                id: '123456',
                affectedService: 'GDSC',
                createdTime: 1568009851331,
                title: 'IOCM-New Zealand...',
                status: 'completed',
            }, {
                id: '123456',
                affectedService: 'GDSC',
                createdTime: 1568009851331,
                title: 'IOCM-New Zealand...',
                status: 'completed',
            }],
            totalElements: 1,
            totalPages: 1,
        },
        success: true,
        errorCode: null,
        errorMessage: null,
    };
    ctx.body = response;
});

router.get('/osp/api/announcements/:announcementId', async (ctx) => {
    let response: { data: { severity: string; approvalStatus: string; reason: string; expires: number; htmlFileName: string; attachments: Array<{ fileName: string; attachmentId: string; contentType: string } | { fileName: string; attachmentId: string; contentType: string } | { fileName: string; attachmentId: string; contentType: string }>; lastModifiedTime: number; subject: string; resumedTime: number; lastModifiedBy: string; title: string; effectiveTo: number; contents: string; referenceNumber: string; createdBy: string; affectedService: string; synchronization: string; createdTime: number; id: string; effectiveFrom: number }; success: boolean; errorMessage: null; errorCode: null };
    response = {
        success: true,
        errorCode: null,
        errorMessage: null,
        data: {
            id: '123456',
            title: 'IOCM-New Zealand Customs...',
            subject: 'IOCM-New Zealand Customs...',
            affectedService: 'Gateway',
            severity: '3',
            synchronization: 'Yes',
            reason: 'Planned Maintenace',
            effectiveFrom: 1568009851331,
            effectiveTo: 1568009851331,
            resumedTime: 1568009851331,
            expires: 1568009851331,
            contents: 'We will update the status upon s...',
            htmlFileName: 'PCRS042997',
            referenceNumber: 'http://crs.oocl.com/pcrs/pcrs/view-pcrs-detail/042997 ',
            approvalStatus: 'Approved',
            attachments: [{
                attachmentId: '12345678',
                fileName: 'Screen Cap1.jpg',
                contentType: 'images/jpg',
            }, {
                attachmentId: '12345678',
                fileName: 'Screen Cap2.jpg',
                contentType: 'images/jpg',
            }, {
                attachmentId: '12345678',
                fileName: 'Screen Cap3.jpg',
                contentType: 'images/jpg',
            }],
            createdBy: 'HKCTR/COMPUTER OPERATIONS (ISD-OOCLL/HKG)',
            createdTime: 1568009851331,
            lastModifiedBy: 'System Account',
            lastModifiedTime: 1568009851331,
        },
    };
    ctx.body = response;
});

router.get('/eas/api/homeCards', async (ctx) => {
    let response;
    response = {
        data: {
            content: [{
                title: 'CER & OLR',
                desc: 'Capital Expenditure & Operating Lease, Capital Expenditure & Operating Lease',
                toDoCount: 1,
                image: 'oar-bg.png',
            }, {
                title: 'e-APV',
                desc: 'Electronic Account PayableVoucher',
                toDoCount: 0,
                image: 'eapv-bg.png',
            }, {
                title: 'e-Travel',
                desc: 'Business Travel & Expense Claims',
                toDoCount: 0,
                image: 'etravel-bg.png',
            }, {
                title: 'e-Leave',
                desc: 'Global e-Leave System',
                toDoCount: 3,
                image: 'eleave-bg.png',
            }],
            totalElements: 4,
            totalPages: 1,
        },
        success: true,
        errorCode: null,
        errorMessage: null,
    };
    ctx.body = response;
});

router.get('/gateway/contactUs', async (ctx) => {
    let response;
    response = {
        data: '<a target="_blank" data-type="email" data-recipient="eric.q.f.li@oocl.com" data-subject="test" data-description="Hi Team: \r\n Issue/Problem Description: \r\n\r\n ------------">1-408-555-5555</a>',
        success: true,
        errorCode: null,
        errorMessage: null,
    };
    ctx.body = response;
});

router.get('/version.php', async (ctx) => {
    let response;
    response = {
        success: true,
        errorCode: null,
        errorMessage: null,
        data: {
            currentVersion: '1.1.1',
            isMandatory: false,
            isImportant: true,
            verCheckInterval: null,
            gracePeriod: '',
            updateURL: 'itms-services:\/\/?action=download-manifest&amp;url=https:\/\/mbcapp.azurewebsites.net\/OneSupportPortalapp\/onesupportportal.plist',
            description: [
                'Provide display function of system announcement',
                'Provide service request exact match query function',
                'Further optimize the \'Full View\' function',
                'Support manual cache clear function',
                'Provide more contact info of supports',
                'Some minor UI adjustments',
            ],
        },
    };
    ctx.body = response;
});

router.get('/oceanstore_prs/external/api/version/latest', async (ctx) => {
    let response;
    response = {
        success: true,
        errorCode: null,
        errorMessage: null,
        data: {
            currentVersion: '1.1.0',
            isMandatory: false,
            isImportant: true,
            verCheckInterval: null,
            gracePeriod: '',
            intuneUpgradeUrl: 'http://appstore.oocl.com',
            oceanStoreUpgradeUrl: 'https://oceanstorepp.oocl.com/oceanstore_prs/internal?appID=5ed8624de692bb0016ca92a5',
            description: [
                'Provide display function of system announcement',
                'Provide service request exact match query function',
                'Further optimize the \'Full View\' function',
                'Support manual cache clear function',
                'Provide more contact info of supports',
                'Some minor UI adjustments',
            ],
        },
    }; ctx.body = response;
});

createRoutes(router, routes);

export default router;
