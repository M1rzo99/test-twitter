'use client'

import { Bell, Home, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import SidebarPostButton from './sidebar-post-button'
import SidebarAccount from './sidebar-account'
import { IUser } from '@/types'
import { Search } from 'lucide-react'
import SiderbarItem from './siderbar-item'

const Sidebar = ({ user }: { user: IUser }) => {
	const sidebarItems = [
		{ label: 'Home', path: '/', icon: Home },
		{ label: 'Notifications', path: `/notifications/${user?._id}`, icon: Bell, notification: user?.hasNewNotifications },
		{ label: 'Profile', path: `/profile/${user?._id}`, icon: User },
		{ label: 'Explore', path: '/explore', icon: Search },
	]

	return (
		<section className='sticky left-0 top-0 h-screen lg:w-[266px] w-fit flex flex-col justify-between py-4 pl-2'>
			<div className='flex flex-col space-y-2'>
				<div className='flex items-center justify-center p-4 transition rounded-full cursor-pointer h-14 w-14 hover:bg-sky-300 hover:bg-opacity-10'>
					<Image width={56} height={56} src={'/images/logo.svg'} alt='logo' />
				</div>

				{sidebarItems.map(item => (
					<Link key={item.path} href={item.path}>
						<SiderbarItem {...item} />
					</Link>
				))}

				<SidebarPostButton />
			</div>

			<SidebarAccount user={user} />
		</section>
	)
}

export default Sidebar