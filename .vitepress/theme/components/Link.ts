import { type PropType, defineComponent, h } from "vue"
import { base } from '../../common'

const Link = defineComponent({
  props: {
    to: String as PropType<string | null>
  },
  setup(props, context) {
    const _to = base + props.to?.replace(/^\//, '')

    return () => h(props.to ? 'a' : 'span', _to ? { href: _to } : void 0, context.slots.default?.())
  }
})

export default Link