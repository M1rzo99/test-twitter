import Post from "@/database/post.model";
import { connectToDataBase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Notification from "@/database/notification.model";
import User from "@/database/user.model";

export async function PUT(req: Request) {
  try {
    await connectToDataBase();
    const { postId, userId } = await req.json();

    // 1. Postni topamiz
    const post = await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: userId } }, // push emas, addToSet (dublikatdan saqlaydi)
      { new: true }
    );

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // 2. Agar user postga like bosgan bo‘lsa, post egasiga xabar yuboramiz
    if (String(userId) !== String(post.user)) {
      // Notification yozamiz
      await Notification.create({
        user: post.user, // bu post egasining ID si
        body: `${userId} liked your post`
      });

      // hasNewNotifications ni true qilamiz
      await User.findByIdAndUpdate(post.user, {
        $set: { hasNewNotifications: true }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDataBase();
    const { postId, userId } = await req.json();

    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true }
    );

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
