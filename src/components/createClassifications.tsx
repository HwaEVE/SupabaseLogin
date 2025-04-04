export async function createClassifications(uid: string, origin: string) {
    // 회원가입 성공 후 생성할 분류 목록 (예시)
    const classifications = [
        { uuid: uid, name: "의류" },
        { uuid: uid, name: "식량" },
        { uuid: uid, name: "주거" },
        { uuid: uid, name: "기타" },
    ];

    for (const classification of classifications) {
        const response = await fetch(`${origin}/classifications`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(classification),
        });

        if (!response.ok) {
            console.error("계정을 생성하는 것에 실패 했습니다! :", classification);
            // 필요에 따라 에러 처리를 추가할 수 있습니다.
        }
    }
}
