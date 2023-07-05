/* eslint-disable @typescript-eslint/ban-ts-comment */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { RouteLocationNormalized, Router } from 'vue-router'

NProgress.configure({ showSpinner: false })
export const createRouterGuards = (router: Router) => {
    router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => {
        // 开启进度条
        NProgress.start()
        next()

    })

    router.afterEach((to: RouteLocationNormalized) => {
        // 关闭 进度条
        NProgress.done()
    })
}

