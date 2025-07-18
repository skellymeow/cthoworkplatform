import InviteClient from "./InviteClient"

export default async function Page({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  return <InviteClient username={username} />
} 