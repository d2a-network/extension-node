<script>
    import {nodeId, nodeName} from '../store'
    function getStringFirst10Char(str)
    {
        return str.substring(0, 16) + '...'
    }
</script>

<div class = "node-informations">
    <div>
        <h3>{$nodeName}</h3>
        {#if $nodeId != null}
        <span>{getStringFirst10Char($nodeId)}</span>
        {/if}
    </div>
</div>


<style>
    .node-informations {
        padding: 1rem;
        border-bottom: 1px solid #cacaca;
        display: flex;
        justify-content: center;
        align-self: center;
        text-align: center;
    }

    h3 {
        text-transform: uppercase;
        margin-bottom: 1rem;
    }

    span {
        margin-top: 0.5rem;
    }
</style>
