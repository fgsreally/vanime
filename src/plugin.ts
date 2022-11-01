import { PluginOption } from 'vite';
import MagicString from "magic-string"
import { parse, transform } from "@vue/compiler-dom"
export async function compileSFCTemplate(
    code: string,
) {

    // MagicString是一个非常好用的字符串操作库,也如它的名字一样,非常的神奇 !
    // 有了它,我们可以直接操作字符串,避免操作AST,换来更好的性能. Vue3的实现也大量的用到了它.
    const s = new MagicString(code)

    // SFC => AST
    const ast = parse(code, { comments: true })

    const result = await new Promise((resolve) => {
        transform(ast, {
            // ast node节点访问器
            nodeTransforms: [
                (node: any) => {
                    if (node.type === 1 && !["script", "style"].includes(node.tag) && node.props?.some((item: any) => item.name = "anime")) {

                        s.prependLeft(
                            node.loc.start.offset,
                            `<transition :css="false" @before-enter="$enterBefore" @enter="$enter" @leave="$leave" @after-leave="$leaveAfter" @enter-cancelled="$enterCancel" @leave-cancelled="$leaveCancel">`
                        )


                        s.prependRight(
                            node.loc.start.offset + node.loc.source.length,
                            `</transition>`,
                        )
                    }
                },
            ],
        })
        resolve(s.toString())
    })
    return result
}

export function viteAnime(): PluginOption {
    return {
        name: "vite:vanime-compiler",
        enforce: "pre",
        async transform(code: string, id: string) {
            if (id.endsWith(".vue")) {
                return await compileSFCTemplate(code) as string
            }
        }
    }
}