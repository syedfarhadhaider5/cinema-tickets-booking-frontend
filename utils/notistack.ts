import { useSnackbar, VariantType, WithSnackbarProps } from 'notistack'
let useSnackbarRef: WithSnackbarProps
export const SnackbarUtilsConfigurator: React.FC = () => {
    useSnackbarRef = useSnackbar()
    return null
}

export const Snakebar = {
    success(msg: string) {
        this.toast(msg, 'success')
    },
    warning(msg: string) {
        this.toast(msg, 'warning')
    },
    info(msg: string) {
        this.toast(msg, 'info')
    },
    error(msg: string) {
        this.toast(msg, 'error')
    },
    toast(msg: string, variant: VariantType = 'default') {
        useSnackbarRef.enqueueSnackbar(msg, { variant })
    }
}