import _import from '@/utils/import'
const Layout = _import('layout/Layout')

export const asyncRouterMap = [
  // 个人中心
  {
    path: '/profile',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: _import('profile/index'),
        name: 'profile',
        meta: {
          title: 'profile',
          icon: 'test'
        }
      }
    ]
  },
  // 景点管理
  {
    path: '/scenicarea',
    component: Layout,
    redirect: 'noredirect',
    name: 'scenicarea',
    meta: {
      title: 'scenicarea',
      icon: 'eye'
    },
    children: [
      {
        path: 'village/:id',
        component: _import('scenicarea/village'),
        name: 'village',
        meta: {
          title: 'village'
          // icon: 'widgets'
        }
      },
      {
        path: 'village/villageadd/add',
        component: _import('scenicarea/villageadd')
      },
      {
        path: 'village/villagedetail/:id',
        component: _import('scenicarea/villagedetail')
      },
      {
        path: 'village/villageedit/:id',
        component: _import('scenicarea/villageedit')
      },
      {
        path: 'venue/:id',
        component: _import('scenicarea/venue'),
        name: 'venue',
        meta: {
          title: 'venue'
          // icon: 'widgets'
        }
      },
      {
        path: 'venue/article/articlemanage/:id/:bid/:bname',
        component: _import('scenicarea/articlemanagevenue')
      },
      {
        path: 'venue/article/articlemanage/:id/:bid/add/addarticle',
        component: _import('scenicarea/articlemanagevenueadd')
      },
      {
        path: 'venue/article/articlemanage/:id/:bid/detail/:vaid',
        component: _import('scenicarea/articlemanagevenuedetail')
      },
      {
        path: 'venue/article/articlemanage/:id/:bid/edit/:vaid',
        component: _import('scenicarea/articlemanagevenueedit')
      },
      {
        path: 'venue/venueadd/add',
        component: _import('scenicarea/venueadd')
      },
      {
        path: 'venue/venuedetail/:id',
        component: _import('scenicarea/venuedetail')
      },
      {
        path: 'venue/venueedit/:id',
        component: _import('scenicarea/venueedit')
      },
      {
        path: 'house/:id',
        component: _import('scenicarea/house'),
        name: 'house',
        meta: {
          title: 'house'
          // icon: 'widgets'
        }
      },
      {
        path: 'house/article/articlemanage/:id/:bid/:bname',
        component: _import('scenicarea/articlemanagehouse')
      },
      {
        path: 'house/article/articlemanage/:id/:bid/add/addarticle',
        component: _import('scenicarea/articlemanagehouseadd')
      },
      {
        path: 'house/article/articlemanage/:id/:bid/detail/:haid',
        component: _import('scenicarea/articlemanagehousedetail')
      },
      {
        path: 'house/article/articlemanage/:id/:bid/edit/:haid',
        component: _import('scenicarea/articlemanagehouseedit')
      },
      {
        path: 'house/houseadd/add',
        component: _import('scenicarea/houseadd')
      },
      {
        path: 'house/housedetail/:id',
        component: _import('scenicarea/housedetail')
      },
      {
        path: 'house/houseedit/:id',
        component: _import('scenicarea/houseedit')
      }
    ]
  },
  // 专题管理
  {
    path: '/seminar',
    component: Layout,
    redirect: 'noredirect',
    name: 'seminar',
    meta: {
      title: 'seminar',
      icon: 'comp'
    },
    children: [
      {
        path: 'symposium/:id',
        component: _import('seminar/symposium'),
        name: 'symposium',
        meta: {
          title: 'symposium'
          // icon: 'widgets'
        }
      },
      {
        path: 'symposium/symposiumadd/add',
        component: _import('seminar/symposiumadd')
      },
      {
        path: 'symposium/symposiumdetail/:id',
        component: _import('seminar/symposiumdetail')
      },
      {
        path: 'symposium/symposiumedit/:id',
        component: _import('seminar/symposiumedit')
      },
      {
        path: 'column/:id',
        component: _import('seminar/column'),
        name: 'column',
        meta: {
          title: 'column'
          // icon: 'widgets'
        }
      },
      {
        path: 'column/columnadd/add',
        component: _import('seminar/columnadd')
      },
      {
        path: 'column/columnedit/:id',
        component: _import('seminar/columnedit')
      },
      {
        path: 'column/columndetail/:id',
        component: _import('seminar/columndetail')
      },
      {
        path: 'field/:id',
        component: _import('seminar/field'),
        name: 'field',
        meta: {
          title: 'field'
        }
      },
      {
        path: 'component/:id',
        component: _import('seminar/component'),
        name: 'component',
        meta: {
          title: 'component'
        }
      },
      {
        path: 'advertisement/:id',
        component: _import('seminar/advertisement'),
        name: 'advertisement',
        meta: {
          title: 'advertisement'
        }
      },
      {
        path: 'advertisement/advertisementadd/add',
        component: _import('seminar/advertisementadd')
      },
      {
        path: 'advertisement/advertisementedit/:id',
        component: _import('seminar/advertisementedit')
      },
      {
        path: 'advertisement/advertisementdetail/:id',
        component: _import('seminar/advertisementdetail')
      },
      {
        path: 'pagelayout/:id',
        component: _import('seminar/pagelayout'),
        name: 'pagelayout',
        meta: {
          title: 'pagelayout'
        }
      }
    ]
  },
  // 资讯管理
  {
    path: '/article',
    component: Layout,
    redirect: 'noredirect',
    name: 'article',
    meta: {
      title: 'article',
      icon: 'comp'
    },
    children: [
      {
        path: 'information/:id',
        component: _import('article/information'), // 资讯管理
        name: 'information',
        meta: {
          title: 'information'
        }
      },
      {
        path: 'information/informationadd/:id',
        component: _import('article/informationadd')
      },
      {
        path: 'information/informationedit/:id',
        component: _import('article/informationedit')
      },
      {
        path: 'information/informationdetail/:id',
        component: _import('article/informationdetail')
      },
      {
        path: 'subsystem/:id',
        component: _import('article/subsystem'), // 资讯管理
        name: 'subsystem',
        meta: {
          title: 'subsystem'
        }
      }
    ]
  },
  // 友链管理
  {
    path: '/friendlink',
    component: Layout,
    meta: {
      title: 'friendlink',
      icon: 'attachment'
    },
    children: [
      {
        path: 'friendchain/:id',
        component: _import('friendlink/friendchain'),
        name: 'friendchain',
        meta: {
          title: 'friendchain'
        }
      }
    ]
  },
  // 意见管理
  {
    path: '/suggestion',
    component: Layout,
    meta: {
      title: 'suggestion',
      icon: 'attachment'
    },
    children: [
      {
        path: 'objection/:id',
        component: _import('suggestion/objection'),
        name: 'objection',
        meta: {
          title: 'objection'
        }
      }
    ]
  },
  // 附件管理
  {
    path: '/attachment',
    component: Layout,
    meta: {
      title: 'attachment',
      icon: 'attachment'
    },
    children: [
      {
        path: 'accessory/:id',
        component: _import('attachment/accessory'),
        name: 'accessory',
        meta: {
          title: 'accessory'
        }
      }
    ]
  },
  // 活动管理
  {
    path: '/exercise',
    component: Layout,
    meta: {
      title: 'exercise',
      icon: 'attachment'
    },
    children: [
      {
        path: 'activity/:id',
        component: _import('exercise/activity'),
        name: 'activity',
        meta: {
          title: 'activity'
        }
      }
    ]
  },
  // 攻略管理
  {
    path: '/stratagem',
    component: Layout,
    meta: {
      title: 'stratagem',
      icon: 'attachment'
    },
    children: [
      {
        path: 'strategy/:id',
        component: _import('stratagem/strategy'),
        name: 'strategy',
        meta: {
          title: 'strategy'
        }
      }
    ]
  },
  // 抢票子系统
  {
    path: '/collarticket',
    component: Layout,
    redirect: 'noredirect',
    name: 'collarticket',
    meta: {
      title: 'collarticket',
      icon: 'attachment'
    },
    children: [
      {
        path: 'ticketMGT/:id',
        component: _import('collarticket/ticketMGT'), // 票券管理
        name: 'ticketMGT',
        meta: {
          title: 'ticketMGT'
        }
      },
      {
        path: 'ticketMGT/ticketMGTdetail/:id',
        component: _import('collarticket/ticketMGTdetail') // 票券管理详情
      },
      {
        path: 'ticketMGT/ticketMGTedit/:id',
        component: _import('collarticket/ticketMGTedit') // 票券管理编辑
      },
      {
        path: 'ticketMGT/ticketMGTadd/add',
        component: _import('collarticket/ticketMGTadd') // 票券管理新增
      },
      {
        path: 'userTicketMGT/:id',
        component: _import('collarticket/userTicketMGT'), //  用户领票管理
        name: 'userTicketMGT',
        meta: {
          title: 'userTicketMGT'
        }
      }
    ]
  },
  // 抽奖子系统
  {
    path: '/luckdraw',
    component: Layout,
    redirect: 'noredirect',
    name: 'luckdraw',
    meta: {
      title: 'luckdraw',
      icon: 'attachment'
    },
    children: [
      {
        path: 'luckDrawMGT/:id',
        component: _import('luckdraw/luckDrawMGT'), // 抽奖管理
        name: 'luckDrawMGT',
        meta: {
          title: 'luckDrawMGT'
        }
      },
      {
        path: 'luckDrawMGT/luckDrawMGTdetail/:id',
        component: _import('luckdraw/luckDrawMGTdetail') // 抽奖管理详情
      },
      {
        path: 'luckDrawMGT/luckDrawMGTedit/:id',
        component: _import('luckdraw/luckDrawMGTedit') // 抽奖管理编辑
      },
      {
        path: 'luckDrawMGT/luckDrawMGTadd/add',
        component: _import('luckdraw/luckDrawMGTadd') // 抽奖管理新增
      },
      {
        path: 'userLuckDrawMGT/:id',
        component: _import('luckdraw/userLuckDrawMGT'), //  用户抽奖记录管理
        name: 'userLuckDrawMGT',
        meta: {
          title: 'userLuckDrawMGT'
        }
      },
      {
        path: 'prizeSetting/:id',
        component: _import('luckdraw/prizeSetting'), //  奖品设置
        name: 'prizeSetting',
        meta: {
          title: 'prizeSetting'
        }
      }
    ]
  },
  // 投稿子系统
  {
    path: '/contribute',
    component: Layout,
    redirect: 'noredirect',
    name: 'contribute',
    meta: {
      title: 'contribute',
      icon: 'attachment'
    },
    children: [
      {
        path: 'contributeMGT/:id',
        component: _import('contribute/contributeMGT'), // 投稿管理
        name: 'contributeMGT',
        meta: {
          title: 'contributeMGT'
        }
      },
      {
        path: 'userContributeMGT/:id',
        component: _import('contribute/userContributeMGT'), //  用户投稿记录管理
        name: 'userContributeMGT',
        meta: {
          title: 'userContributeMGT'
        }
      }
    ]
  },
  // 图书管理
  {
    path: '/book',
    component: Layout,
    redirect: 'noredirect',
    name: 'book',
    meta: {
      title: 'book',
      icon: 'attachment'
    },
    children: [
      {
        path: 'bookinfo/:id',
        component: _import('book/bookinfo'), // 图书资讯
        name: 'bookinfo',
        meta: {
          title: 'bookinfo'
        }
      },
      {
        path: 'booksdonate/:id',
        component: _import('book/booksdonate'), // 赠书芳名
        name: 'booksdonate',
        meta: {
          title: 'booksdonate'
        }
      }
      /*,
      {
        path: 'booksRecommend/:id',
        component: _import('book/booksRecommend'), // 新书推荐
        name: 'booksRecommend',
        meta: {
          title: 'booksRecommend'
        }
      }*/
    ]
  },
  // 预约报名子系统
  {
    path: '/bespeakenroll',
    component: Layout,
    redirect: 'noredirect',
    name: 'bespeakenroll',
    meta: {
      title: 'bespeakenroll',
      icon: 'attachment'
    },
    children: [
      {
        path: 'booking/:id',
        component: _import('bespeakenroll/booking'), // 预约报名管理
        name: 'booking',
        meta: {
          title: 'booking'
        }
      },
      {
        path: 'bookingRecord/:id',
        component: _import('bespeakenroll/bookingRecord'), //  用户预约报名记录管理
        name: 'bookingRecord',
        meta: {
          title: 'bookingRecord'
        }
      }
    ]
  },
  // 系统设置
  {
    path: '/setting',
    component: Layout,
    redirect: 'noredirect',
    name: 'setting',
    meta: {
      title: 'setting',
      icon: 'attachment'
    },
    children: [
      {
        path: 'user/:id',
        component: _import('setting/user'), // 用户管理
        name: 'user',
        meta: {
          title: 'user'
        }
      },
      {
        path: 'role/:id',
        component: _import('setting/role'), // 角色管理
        name: 'role',
        meta: {
          title: 'role'
        }
      },
      {
        path: 'systemLog/:id',
        component: _import('setting/systemLog'), // 系统日志
        name: 'systemLog',
        meta: {
          title: 'systemLog'
        }
      },
      {
        path: 'website/:id',
        component: _import('setting/website'), // 网络配置
        name: 'website',
        meta: {
          title: 'website'
        }
      },
      {
        path: 'preference/:id',
        component: _import('setting/preference'), // 用户偏好设置
        name: 'preference',
        meta: {
          title: 'preference'
        }
      },
      {
        path: 'notice/:id',
        component: _import('setting/notice'), // 通知管理
        name: 'notice',
        meta: {
          title: 'notice'
        }
      },
      {
        path: 'departmentDuty/:id',
        component: _import('setting/departmentDuty'), //  部门职位  
        name: 'departmentDuty',
        meta: {
          title: 'departmentDuty'
        }
      },
      {
        path: 'smsLog/:id',
        component: _import('setting/smsLog'), // 短信记录
        name: 'smsLog',
        meta: {
          title: 'smsLog'
        }
      }
    ]
  },
  // 在线用户管理
  {
    path: '/visitor',
    component: Layout,
    redirect: 'noredirect',
    name: 'visitor',
    meta: {
      title: 'visitor',
      icon: 'attachment'
    },
    children: [
      {
        path: 'visitorMGT/:id',
        component: _import('visitor/visitorMGT'), //在线用户管理
        name: 'visitorMGT',
        meta: {
          title: 'visitorMGT'
        }
      },
      {
        path: 'visitorMGT/visitorMGTdetail/:id',
        component: _import('visitor/visitorMGTdetail'), // 在线用户管理详情
      },
       {
        path: 'messageMGT/:id',
        component: _import('visitor/messageMGT'), //消息推送管理
        name: 'messageMGT',
        meta: {
          title: 'messageMGT'
        }
      },
    ]
  },
  // 志愿管理
  {
    path: '/volunteer',
    component: Layout,
    redirect: 'noredirect',
    name: 'volunteer',
    meta: {
      title: 'volunteer',
      icon: 'tree'
    },
    children: [
      {
        path: 'izyzInformation/:id',
        component: _import('volunteer/izyzInformation'), // 志愿资讯管理
        name: 'izyzInformation',
        meta: {
          title: 'izyzInformation'
        }
      },
      {
        path: 'izyzActivity/:id',
        component: _import('volunteer/izyzActivity'), // 志愿活动管理
        name: 'izyzActivity',
        meta: {
          title: 'izyzActivity'
        }
      },
      {
        path: 'izyzVolunteer/:id',
        component: _import('volunteer/izyzVolunteer'), // 志愿者管理
        name: 'izyzVolunteer',
        meta: {
          title: 'izyzVolunteer'
        }
      }
    ]
  },
  // 投票子系统
  {
    path: '/vote',
    component: Layout,
    redirect: 'noredirect',
    name: 'vote',
    meta: {
      title: 'vote',
      icon: 'tree'
    },
    children: [
      {
        path: 'ballot/:id',
        component: _import('vote/ballot'), // 投票管理
        name: 'ballot',
        meta: {
          title: 'ballot'
        }
      },
      {
        path: 'ballot/ballotdetail/:id',
        component: _import('vote/ballotdetail') // 投票管理详情
      },
      {
        path: 'ballot/ballotedit/:id',
        component: _import('vote/ballotedit') // 投票管理编辑
      },
      {
        path: 'ballot/ballotadd/add',
        component: _import('vote/ballotadd') // 投票管理新增
      },
      {
        path: 'signup/:id',
        component: _import('vote/signup'), // 报名管理
        name: 'signup',
        meta: {
          title: 'signup'
        }
      },
      {
        path: 'signup/signupdetail/:id',
        component: _import('vote/signupdetail') // 报名管理详情
      },
      {
        path: 'signup/signupedit/:id',
        component: _import('vote/signupedit') // 报名管理编辑
      },
      {
        path: 'target/:id',
        component: _import('vote/target'), // 对象管理
        name: 'target',
        meta: {
          title: 'target'
        }
      },
      {
        path: 'target/targetadd/add',
        component: _import('vote/targetadd') // 对象管理编辑
      },
      {
        path: 'target/targetedit/:id',
        component: _import('vote/targetedit') // 对象管理编辑
      },
      {
        path: 'target/targetdetail/:id',
        component: _import('vote/targetdetail') // 报名管理详情
      }
    ]
  },
  // 卡片列表
  {
    path: '/panels',
    component: Layout,
    children: [
      {
        path: 'index',
        component: _import('panels/index'),
        name: 'panels',
        meta: {
          title: 'panels',
          icon: 'panels'
        }
      }
    ]
  },
  // 权限页面 只有 admin 用户才可访问
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        component: _import('permission/index'),
        name: 'permission',
        meta: {
          title: 'permission',
          icon: 'test',
          roles: ['admin']
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
