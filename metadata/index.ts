import type { Creator } from '../scripts/types/metadata'
import { getAvatarUrlByGithubName } from '../scripts/utils'

/** 文本 */
export const siteName = '中国通用人工智能协会'
export const siteShortName = 'AGI Society CN'
export const siteDescription = '中国通用人工智能协会（AGI Society CN）知识库，基于 NARS 理论与开源实现'

/** 文档所在目录 */
export const include = ['百科', 'NARS', '会议', '研究', '关于']

/** Repo */
export const githubRepoLink = 'https://github.com/HailayLin/agi-society-cn'

/** 无协议前缀域名 */
export const plainTargetDomain = 'localhost:5173'
/** 完整域名 */
export const targetDomain = `http://${plainTargetDomain}`

/** 创作者 */
export const creators: Creator[] = [
  {
    name: '絢香猫',
    avatar: '',
    username: 'nekomeowww',
    title: 'Nólëbase 原始创作者',
    desc: '开发者，专注于基础设施维护，数据分析，后端、DevOps 开发',
    links: [
      { type: 'github', icon: 'github', link: 'https://github.com/nekomeowww' },
      { type: 'twitter', icon: 'twitter', link: 'https://twitter.com/ayakaneko' },
    ],
    nameAliases: ['nekomeowww', '绚香猫', '絢香猫', 'Neko Ayaka', 'Ayaka Neko'],
    emailAliases: ['neko@ayaka.moe'],
  },
  {
    name: '絢香音',
    avatar: '',
    username: 'LittleSound',
    title: 'Nólëbase 原始创作者',
    desc: '开源开发者，专注于前端，以及前端相关工具库和工具链开发',
    links: [
      { type: 'github', icon: 'github', link: 'https://github.com/LittleSound' },
      { type: 'twitter', icon: 'twitter', link: 'https://twitter.com/OikawaRizumu' },
    ],
    nameAliases: ['LittleSound', '绚香音', '絢香音', 'Rizumu Oikawa', 'Rizumu Ayaka', 'Ayaka Rizumu', 'Rizumu'],
    emailAliases: ['rizumu@ayaka.moe', 'rizumu@oqo.moe'],
  },
].map<Creator>((c) => {
  c.avatar = c.avatar || getAvatarUrlByGithubName(c.username)
  return c as Creator
})

export const creatorNames = creators.map(c => c.name)
export const creatorUsernames = creators.map(c => c.username || '')
