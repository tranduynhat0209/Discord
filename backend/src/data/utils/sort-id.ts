export function sortId(userId0: string, userId1: string) {
  if (userId0 < userId1) return { userId0, userId1 };
  else
    return {
      userId0: userId1,
      userId1: userId0,
    };
}
